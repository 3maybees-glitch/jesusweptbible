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

export interface Book {
  name: string
  abbreviation: string
  testamentType: string
  chapters?: number
}

// Sample chapters object - populated from /public/data/bible-chapters/ JSON files
// When you upload JSON files, they will be automatically loaded at runtime
export const sampleChapters: Record<string, Chapter> = {}

export const bibleBooks: Book[] = [
  { name: 'Genesis', abbreviation: 'Gen', testamentType: 'OT' },
  { name: 'Exodus', abbreviation: 'Ex', testamentType: 'OT' },
  { name: 'Leviticus', abbreviation: 'Lev', testamentType: 'OT' },
  { name: 'Numbers', abbreviation: 'Num', testamentType: 'OT' },
  { name: 'Deuteronomy', abbreviation: 'Deut', testamentType: 'OT' },
  { name: 'Joshua', abbreviation: 'Josh', testamentType: 'OT' },
  { name: 'Judges', abbreviation: 'Judg', testamentType: 'OT' },
  { name: 'Ruth', abbreviation: 'Ruth', testamentType: 'OT' },
  { name: '1 Samuel', abbreviation: '1 Sam', testamentType: 'OT' },
  { name: '2 Samuel', abbreviation: '2 Sam', testamentType: 'OT' },
  { name: '1 Kings', abbreviation: '1 Kings', testamentType: 'OT' },
  { name: '2 Kings', abbreviation: '2 Kings', testamentType: 'OT' },
  { name: '1 Chronicles', abbreviation: '1 Chron', testamentType: 'OT' },
  { name: '2 Chronicles', abbreviation: '2 Chron', testamentType: 'OT' },
  { name: 'Ezra', abbreviation: 'Ezra', testamentType: 'OT' },
  { name: 'Nehemiah', abbreviation: 'Neh', testamentType: 'OT' },
  { name: 'Esther', abbreviation: 'Esth', testamentType: 'OT' },
  { name: 'Job', abbreviation: 'Job', testamentType: 'OT' },
  { name: 'Psalms', abbreviation: 'Ps', testamentType: 'OT' },
  { name: 'Proverbs', abbreviation: 'Prov', testamentType: 'OT' },
  { name: 'Ecclesiastes', abbreviation: 'Eccl', testamentType: 'OT' },
  { name: 'Song of Solomon', abbreviation: 'SS', testamentType: 'OT' },
  { name: 'Isaiah', abbreviation: 'Isa', testamentType: 'OT' },
  { name: 'Jeremiah', abbreviation: 'Jer', testamentType: 'OT' },
  { name: 'Lamentations', abbreviation: 'Lam', testamentType: 'OT' },
  { name: 'Ezekiel', abbreviation: 'Ezek', testamentType: 'OT' },
  { name: 'Daniel', abbreviation: 'Dan', testamentType: 'OT' },
  { name: 'Hosea', abbreviation: 'Hos', testamentType: 'OT' },
  { name: 'Joel', abbreviation: 'Joel', testamentType: 'OT' },
  { name: 'Amos', abbreviation: 'Amos', testamentType: 'OT' },
  { name: 'Obadiah', abbreviation: 'Obad', testamentType: 'OT' },
  { name: 'Jonah', abbreviation: 'Jon', testamentType: 'OT' },
  { name: 'Micah', abbreviation: 'Mic', testamentType: 'OT' },
  { name: 'Nahum', abbreviation: 'Nah', testamentType: 'OT' },
  { name: 'Habakkuk', abbreviation: 'Hab', testamentType: 'OT' },
  { name: 'Zephaniah', abbreviation: 'Zeph', testamentType: 'OT' },
  { name: 'Haggai', abbreviation: 'Hag', testamentType: 'OT' },
  { name: 'Zechariah', abbreviation: 'Zech', testamentType: 'OT' },
  { name: 'Malachi', abbreviation: 'Mal', testamentType: 'OT' },
  { name: 'Matthew', abbreviation: 'Matt', testamentType: 'NT' },
  { name: 'Mark', abbreviation: 'Mark', testamentType: 'NT' },
  { name: 'Luke', abbreviation: 'Luke', testamentType: 'NT' },
  { name: 'John', abbreviation: 'John', testamentType: 'NT' },
  { name: 'Acts', abbreviation: 'Acts', testamentType: 'NT' },
  { name: 'Romans', abbreviation: 'Rom', testamentType: 'NT' },
  { name: '1 Corinthians', abbreviation: '1 Cor', testamentType: 'NT' },
  { name: '2 Corinthians', abbreviation: '2 Cor', testamentType: 'NT' },
  { name: 'Galatians', abbreviation: 'Gal', testamentType: 'NT' },
  { name: 'Ephesians', abbreviation: 'Eph', testamentType: 'NT' },
  { name: 'Philippians', abbreviation: 'Phil', testamentType: 'NT' },
  { name: 'Colossians', abbreviation: 'Col', testamentType: 'NT' },
  { name: '1 Thessalonians', abbreviation: '1 Thess', testamentType: 'NT' },
  { name: '2 Thessalonians', abbreviation: '2 Thess', testamentType: 'NT' },
  { name: '1 Timothy', abbreviation: '1 Tim', testamentType: 'NT' },
  { name: '2 Timothy', abbreviation: '2 Tim', testamentType: 'NT' },
  { name: 'Titus', abbreviation: 'Titus', testamentType: 'NT' },
  { name: 'Philemon', abbreviation: 'Phlm', testamentType: 'NT' },
  { name: 'Hebrews', abbreviation: 'Heb', testamentType: 'NT' },
  { name: 'James', abbreviation: 'James', testamentType: 'NT' },
  { name: '1 Peter', abbreviation: '1 Pet', testamentType: 'NT' },
  { name: '2 Peter', abbreviation: '2 Pet', testamentType: 'NT' },
  { name: '1 John', abbreviation: '1 John', testamentType: 'NT' },
  { name: '2 John', abbreviation: '2 John', testamentType: 'NT' },
  { name: '3 John', abbreviation: '3 John', testamentType: 'NT' },
  { name: 'Jude', abbreviation: 'Jude', testamentType: 'NT' },
  { name: 'Revelation', abbreviation: 'Rev', testamentType: 'NT' },
]

export function getChapter(book: string, chapter: number): Chapter | null {
  const normalizedBook = book.replace(/\s+/g, '')
  const key = `${normalizedBook}-${chapter}`
  const chapterData = sampleChapters[key]
  
  if (!chapterData) return null
  
  // Add book and chapter fields to each verse if they're missing
  return {
    ...chapterData,
    verses: chapterData.verses.map((verse) => ({
      ...verse,
      book: verse.book || chapterData.book,
      chapter: verse.chapter !== undefined ? verse.chapter : chapterData.chapter,
    }))
  }
}

export function getBookByName(name: string): Book | undefined {
  return bibleBooks.find((b) => b.name === name)
}
