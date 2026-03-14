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
    reference: "John 11:35",
    painting: "jesus-wept.jpg",
    title: "Jesus Wept",
    artist: "Historical Christian Art",
    description: "The shortest verse in the Bible depicting Jesus's compassion and humanity as he mourned Lazarus."
  }
]

// Normalize verse reference for comparison
function normalizeReference(reference: string): string {
  return reference.toLowerCase().replace(/\s+/g, " ").trim()
}

// Create a map of normalized references to paintings
function getVerseArtMap(): Map<string, VerseArtPainting> {
  const map = new Map<string, VerseArtPainting>()
  VERSE_ART_MAPPINGS.forEach((painting) => {
    const normalizedRef = normalizeReference(painting.reference)
    map.set(normalizedRef, painting)
  })
  return map
}

// Get art for a specific verse
export async function getVerseArt(
  book: string,
  chapter: number | string,
  verse: number | string,
): Promise<VerseArtPainting | null> {
  const mappings = getVerseArtMap()
  const reference = normalizeReference(`${book} ${chapter}:${verse}`)
  console.log("[v0] Looking for art: searching for", reference)
  const result = mappings.get(reference)
  console.log("[v0] Art found:", result ? result.title : "none")
  return result || null
}

// Get all verses with art
export async function getAllVersesWithArt(): Promise<VerseArtPainting[]> {
  return VERSE_ART_MAPPINGS
}
