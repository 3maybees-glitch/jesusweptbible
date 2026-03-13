import fs from 'fs'
import path from 'path'

export interface Verse {
  verse: number
  text: string
  book?: string
  chapter?: number
}

export interface Chapter {
  book: string
  chapter: number
  verses: Verse[]
}

const dataDir = path.join(process.cwd(), 'public', 'data', 'bible-chapters')
const cache: Map<string, Chapter> = new Map()

/**
 * Load a chapter from JSON file dynamically
 * File should be named: {book-name}-{chapter-number}.json
 * Example: genesis-1.json, exodus-2.json, job-5.json
 */
export function loadChapter(fileName: string): Chapter | null {
  try {
    // Check cache first
    if (cache.has(fileName)) {
      return cache.get(fileName) || null
    }

    const filePath = path.join(dataDir, `${fileName}.json`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent) as Chapter

    // Cache the result
    cache.set(fileName, data)

    return data
  } catch (error) {
    console.error(`[v0] Error loading chapter ${fileName}:`, error)
    return null
  }
}

/**
 * Load all chapters from the data directory
 */
export function loadAllChapters(): Record<string, Chapter> {
  const chapters: Record<string, Chapter> = {}

  try {
    if (!fs.existsSync(dataDir)) {
      console.warn(`[v0] Data directory not found: ${dataDir}`)
      return chapters
    }

    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'))

    for (const file of files) {
      const fileName = file.replace('.json', '')
      const chapter = loadChapter(fileName)
      
      if (chapter) {
        // Create a key in the format used by the app: "bookname-chapternumber"
        const key = `${chapter.book.replace(/\s+/g, '')}-${chapter.chapter}`
        chapters[key] = chapter
      }
    }
  } catch (error) {
    console.error('[v0] Error loading chapters directory:', error)
  }

  return chapters
}

/**
 * Clear the cache (useful for testing or refreshing data)
 */
export function clearCache(): void {
  cache.clear()
}
