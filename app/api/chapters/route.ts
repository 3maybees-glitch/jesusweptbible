import { readdir, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export interface Verse {
  verse: number
  text: string
}

export interface Chapter {
  book: string
  chapter: number
  verses: Verse[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterName = searchParams.get('chapter')

  try {
    // Try multiple possible locations for uploaded JSON files
    const possibleDirs = [
      join(process.cwd(), 'public', 'data', 'bible-chapters'),
      join(process.cwd(), 'public', 'data'),
      join(process.cwd(), 'lib', 'chapters'),
    ]

    let dataDir = ''
    for (const dir of possibleDirs) {
      if (existsSync(dir)) {
        dataDir = dir
        break
      }
    }

    // If no directory found, use the default (will be created on first upload)
    if (!dataDir) {
      dataDir = join(process.cwd(), 'public', 'data', 'bible-chapters')
    }

    // If specific chapter requested, return that one
    if (chapterName) {
      const filePath = join(dataDir, `${chapterName}.json`)
      
      try {
        const fileContent = await readFile(filePath, 'utf-8')
        const chapter = JSON.parse(fileContent)
        return NextResponse.json(chapter)
      } catch {
        return NextResponse.json(null, { status: 404 })
      }
    }

    // Otherwise, return list of all available chapters
    try {
      const files = await readdir(dataDir)
      const chapters = files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''))

      return NextResponse.json({ chapters, count: chapters.length, dataDir })
    } catch {
      return NextResponse.json({ chapters: [], count: 0, dataDir, message: 'Directory not found yet' })
    }
  } catch (error) {
    console.error('[v0] Error loading chapters:', error)
    return NextResponse.json(
      { error: 'Failed to load chapters', details: String(error) },
      { status: 500 }
    )
  }
}

