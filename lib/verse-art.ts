// Utility to check if a verse has associated Christian art
export interface VerseArtPainting {
  reference: string
  painting: string
  title: string
  artist: string
  description: string
}

// Cache for loaded mappings
let verseArtMap: Map<string, VerseArtPainting> | null = null

// Normalize verse reference for comparison
function normalizeReference(reference: string): string {
  return reference.toLowerCase().replace(/\s+/g, " ").trim()
}

// Load verse art mappings
async function loadVerseArtMappings(): Promise<Map<string, VerseArtPainting>> {
  if (verseArtMap) {
    return verseArtMap
  }

  try {
    const response = await fetch("/data/verse-art-mappings.json")
    if (!response.ok) {
      throw new Error(`Failed to fetch mappings: ${response.status}`)
    }
    const data = await response.json()
    verseArtMap = new Map()

    if (data.verseArtPaintings && Array.isArray(data.verseArtPaintings)) {
      data.verseArtPaintings.forEach((painting: VerseArtPainting) => {
        const normalizedRef = normalizeReference(painting.reference)
        verseArtMap!.set(normalizedRef, painting)
      })
    }

    return verseArtMap
  } catch (error) {
    console.error("[v0] Failed to load verse art mappings:", error)
    return new Map()
  }
}

// Get art for a specific verse
export async function getVerseArt(
  book: string,
  chapter: number | string,
  verse: number | string,
): Promise<VerseArtPainting | null> {
  const mappings = await loadVerseArtMappings()
  const reference = normalizeReference(`${book} ${chapter}:${verse}`)
  return mappings.get(reference) || null
}

// Get all verses with art
export async function getAllVersesWithArt(): Promise<VerseArtPainting[]> {
  const mappings = await loadVerseArtMappings()
  return Array.from(mappings.values())
}
