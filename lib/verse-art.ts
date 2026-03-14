// Utility to check if a verse has associated Christian art
export interface VerseArtPainting {
  reference: string
  painting: string
  title: string
  artist: string
  description: string
}

// Verse-to-art mappings embedded directly
const VERSE_ART_MAPPINGS: VerseArtPainting[] = [
  {
    reference: "john 11:35",
    painting: "jesus-wept.jpg",
    title: "Jesus Wept",
    artist: "Historical Christian Art",
    description: "The shortest verse in the Bible depicting Jesus's compassion and humanity as he mourned Lazarus."
  }
]

// Normalize verse reference for comparison
function normalizeReference(reference: string): string {
  const normalized = reference.toLowerCase().replace(/\s+/g, " ").trim()
  return normalized
}

// Create a map of normalized references to paintings
function getVerseArtMap(): Map<string, VerseArtPainting> {
  const map = new Map<string, VerseArtPainting>()
  VERSE_ART_MAPPINGS.forEach((painting) => {
    const normalizedRef = normalizeReference(painting.reference)
    console.log("[v0] Registering art mapping:", normalizedRef, "->", painting.title)
    map.set(normalizedRef, painting)
  })
  console.log("[v0] Total art mappings registered:", map.size)
  return map
}

// Get art for a specific verse
export async function getVerseArt(
  book: string,
  chapter: number | string,
  verse: number | string,
): Promise<VerseArtPainting | null> {
  const mappings = getVerseArtMap()
  
  // Build reference step by step
  const bookStr = String(book).toLowerCase().trim()
  const chapterStr = String(chapter).trim()
  const verseStr = String(verse).trim()
  const reference = `${bookStr} ${chapterStr}:${verseStr}`
  
  console.log("[v0] === VERSE ART LOOKUP ===")
  console.log("[v0] Input params:")
  console.log("[v0]   - book:", book, `(type: ${typeof book})`)
  console.log("[v0]   - chapter:", chapter, `(type: ${typeof chapter})`)
  console.log("[v0]   - verse:", verse, `(type: ${typeof verse})`)
  console.log("[v0] Normalized to:", reference)
  console.log("[v0] Available mappings:")
  Array.from(mappings.keys()).forEach(key => {
    console.log("[v0]   -", key)
  })
  
  const result = mappings.get(reference)
  console.log("[v0] Match result:", result ? `FOUND: ${result.title}` : "NOT FOUND")
  console.log("[v0] === END LOOKUP ===")
  
  return result || null
}

// Get all verses with art
export async function getAllVersesWithArt(): Promise<VerseArtPainting[]> {
  return VERSE_ART_MAPPINGS
}
