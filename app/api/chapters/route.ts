import { readdir, readFile } from 'fs/promises'
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

const dataDir = join(process.cwd(), 'public', 'data', 'bible-chapters')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterName = searchParams.get('chapter')

  try {
    // If specific chapter requested, return that one
    if (chapterName) {
      const filePath = join(dataDir, `${chapterName}.json`)
      const fileContent = await readFile(filePath, 'utf-8')
      const chapter = JSON.parse(fileContent)
      return NextResponse.json(chapter)
    }

    // Otherwise, return list of all available chapters
    const files = await readdir(dataDir)
    const chapters = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))

    return NextResponse.json({ chapters, count: chapters.length })
  } catch (error) {
    console.error('[v0] Error loading chapters:', error)
    return NextResponse.json(
      { error: 'Failed to load chapters', details: String(error) },
      { status: 500 }
    )
  }
}
