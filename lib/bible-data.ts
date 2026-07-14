export interface HighlightedWord {
  word: string
  definition?: string
  strongNumber?: string
  language?: string
  lemma?: string
  meaning?: string
}

export interface Verse {
  verse?: number
  verseNumber?: number
  text: string
  book?: string
  chapter?: number
  highlightedWords?: HighlightedWord[]
}

export interface ChapterSection {
  title?: string
  verses: Verse[]
}

export interface ChapterTheme {
  twoWordSummary?: string | { wordOne?: HighlightedWord; wordTwo?: HighlightedWord }
  themeWords?: HighlightedWord[]
}

export interface Chapter {
  book: string
  chapter: number
  verses?: Verse[]
  sections?: ChapterSection[]
  chapterTheme?: ChapterTheme
  twoWordSummary?: string | { wordOne?: HighlightedWord; wordTwo?: HighlightedWord }
  themeWords?: HighlightedWord[]
  themeSummary?: string
  sentenceTheme?: string
  sentenceDescription?: string
}

export interface Book {
  name: string
  abbreviation: string
  testament: 'OT' | 'NT'
  chapters: number
}

export const bibleBooks: Book[] = [
  { name: 'Genesis', abbreviation: 'Gen', testament: 'OT', chapters: 50 },
  { name: 'Exodus', abbreviation: 'Ex', testament: 'OT', chapters: 40 },
  { name: 'Leviticus', abbreviation: 'Lev', testament: 'OT', chapters: 27 },
  { name: 'Numbers', abbreviation: 'Num', testament: 'OT', chapters: 36 },
  { name: 'Deuteronomy', abbreviation: 'Deut', testament: 'OT', chapters: 34 },
  { name: 'Joshua', abbreviation: 'Josh', testament: 'OT', chapters: 24 },
  { name: 'Judges', abbreviation: 'Judg', testament: 'OT', chapters: 21 },
  { name: 'Ruth', abbreviation: 'Ruth', testament: 'OT', chapters: 4 },
  { name: '1 Samuel', abbreviation: '1 Sam', testament: 'OT', chapters: 31 },
  { name: '2 Samuel', abbreviation: '2 Sam', testament: 'OT', chapters: 24 },
  { name: '1 Kings', abbreviation: '1 Kings', testament: 'OT', chapters: 22 },
  { name: '2 Kings', abbreviation: '2 Kings', testament: 'OT', chapters: 25 },
  { name: '1 Chronicles', abbreviation: '1 Chron', testament: 'OT', chapters: 29 },
  { name: '2 Chronicles', abbreviation: '2 Chron', testament: 'OT', chapters: 36 },
  { name: 'Ezra', abbreviation: 'Ezra', testament: 'OT', chapters: 10 },
  { name: 'Nehemiah', abbreviation: 'Neh', testament: 'OT', chapters: 13 },
  { name: 'Esther', abbreviation: 'Esth', testament: 'OT', chapters: 10 },
  { name: 'Job', abbreviation: 'Job', testament: 'OT', chapters: 42 },
  { name: 'Psalms', abbreviation: 'Ps', testament: 'OT', chapters: 150 },
  { name: 'Proverbs', abbreviation: 'Prov', testament: 'OT', chapters: 31 },
  { name: 'Ecclesiastes', abbreviation: 'Eccl', testament: 'OT', chapters: 12 },
  { name: 'Song of Solomon', abbreviation: 'SS', testament: 'OT', chapters: 8 },
  { name: 'Isaiah', abbreviation: 'Isa', testament: 'OT', chapters: 66 },
  { name: 'Jeremiah', abbreviation: 'Jer', testament: 'OT', chapters: 52 },
  { name: 'Lamentations', abbreviation: 'Lam', testament: 'OT', chapters: 5 },
  { name: 'Ezekiel', abbreviation: 'Ezek', testament: 'OT', chapters: 48 },
  { name: 'Daniel', abbreviation: 'Dan', testament: 'OT', chapters: 12 },
  { name: 'Hosea', abbreviation: 'Hos', testament: 'OT', chapters: 14 },
  { name: 'Joel', abbreviation: 'Joel', testament: 'OT', chapters: 3 },
  { name: 'Amos', abbreviation: 'Amos', testament: 'OT', chapters: 9 },
  { name: 'Obadiah', abbreviation: 'Obad', testament: 'OT', chapters: 1 },
  { name: 'Jonah', abbreviation: 'Jon', testament: 'OT', chapters: 4 },
  { name: 'Micah', abbreviation: 'Mic', testament: 'OT', chapters: 7 },
  { name: 'Nahum', abbreviation: 'Nah', testament: 'OT', chapters: 3 },
  { name: 'Habakkuk', abbreviation: 'Hab', testament: 'OT', chapters: 3 },
  { name: 'Zephaniah', abbreviation: 'Zeph', testament: 'OT', chapters: 3 },
  { name: 'Haggai', abbreviation: 'Hag', testament: 'OT', chapters: 2 },
  { name: 'Zechariah', abbreviation: 'Zech', testament: 'OT', chapters: 14 },
  { name: 'Malachi', abbreviation: 'Mal', testament: 'OT', chapters: 4 },
  { name: 'Matthew', abbreviation: 'Matt', testament: 'NT', chapters: 28 },
  { name: 'Mark', abbreviation: 'Mark', testament: 'NT', chapters: 16 },
  { name: 'Luke', abbreviation: 'Luke', testament: 'NT', chapters: 24 },
  { name: 'John', abbreviation: 'John', testament: 'NT', chapters: 21 },
  { name: 'Acts', abbreviation: 'Acts', testament: 'NT', chapters: 28 },
  { name: 'Romans', abbreviation: 'Rom', testament: 'NT', chapters: 16 },
  { name: '1 Corinthians', abbreviation: '1 Cor', testament: 'NT', chapters: 16 },
  { name: '2 Corinthians', abbreviation: '2 Cor', testament: 'NT', chapters: 13 },
  { name: 'Galatians', abbreviation: 'Gal', testament: 'NT', chapters: 6 },
  { name: 'Ephesians', abbreviation: 'Eph', testament: 'NT', chapters: 6 },
  { name: 'Philippians', abbreviation: 'Phil', testament: 'NT', chapters: 4 },
  { name: 'Colossians', abbreviation: 'Col', testament: 'NT', chapters: 4 },
  { name: '1 Thessalonians', abbreviation: '1 Thess', testament: 'NT', chapters: 5 },
  { name: '2 Thessalonians', abbreviation: '2 Thess', testament: 'NT', chapters: 3 },
  { name: '1 Timothy', abbreviation: '1 Tim', testament: 'NT', chapters: 6 },
  { name: '2 Timothy', abbreviation: '2 Tim', testament: 'NT', chapters: 4 },
  { name: 'Titus', abbreviation: 'Titus', testament: 'NT', chapters: 3 },
  { name: 'Philemon', abbreviation: 'Phlm', testament: 'NT', chapters: 1 },
  { name: 'Hebrews', abbreviation: 'Heb', testament: 'NT', chapters: 13 },
  { name: 'James', abbreviation: 'James', testament: 'NT', chapters: 5 },
  { name: '1 Peter', abbreviation: '1 Pet', testament: 'NT', chapters: 5 },
  { name: '2 Peter', abbreviation: '2 Pet', testament: 'NT', chapters: 3 },
  { name: '1 John', abbreviation: '1 John', testament: 'NT', chapters: 5 },
  { name: '2 John', abbreviation: '2 John', testament: 'NT', chapters: 1 },
  { name: '3 John', abbreviation: '3 John', testament: 'NT', chapters: 1 },
  { name: 'Jude', abbreviation: 'Jude', testament: 'NT', chapters: 1 },
  { name: 'Revelation', abbreviation: 'Rev', testament: 'NT', chapters: 22 },
]

/**
 * Fetch a chapter JSON file directly from /public/data/bible-chapters/
 * Files should be named lowercase: job-1.json, matthew-5.json, genesis-1.json
 */
export async function fetchChapter(book: string, chapter: number): Promise<Chapter | null> {
  try {
    // Convert to lowercase and replace spaces with hyphens for filename
    const fileName = book.toLowerCase().replace(/\s+/g, '-')
    const url = `/data/bible-chapters/${fileName}-${chapter}.json`
    const response = await fetch(url)

    if (!response.ok) {
      return null
    }

    return await response.json() as Chapter
  } catch {
    return null
  }
}

export function getBookByName(name: string): Book | undefined {
  const normalized = name.trim().toLowerCase()
  return bibleBooks.find((b) => b.name.toLowerCase() === normalized)
}
