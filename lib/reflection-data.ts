import { readFile } from "fs/promises"
import path from "path"

export interface ReflectionPassage {
  id: string
  book: string
  chapter: number
  twoWordSummary: string
  sentenceTheme: string
  tags: string[]
  isFree?: boolean
}

export interface ReflectionCharacter {
  name: string
  twoWordTheme: string
  referenceRange: string
  meaning: string
}

export interface ReflectionSong {
  id: string
  title: string
  artist: string
  type: "hymn" | "ccm"
  tags: string[]
}

export interface ReflectionQuote {
  id: string
  text: string
  attribution: string
  tags: string[]
}

export interface ReflectionLandscape {
  id: string
  book: string
  moodLabel: string
  imagePath: string
  tags: string[]
}

export interface ReflectionCatalogs {
  passages: ReflectionPassage[]
  characters: ReflectionCharacter[]
  songs: ReflectionSong[]
  quotes: ReflectionQuote[]
  landscapes: ReflectionLandscape[]
}

async function readJson<T>(relativePath: string): Promise<T> {
  const fullPath = path.join(process.cwd(), "public", "data", relativePath)
  const raw = await readFile(fullPath, "utf-8")
  return JSON.parse(raw.replace(/^\uFEFF/, "")) as T
}

export async function loadReflectionCatalogs(): Promise<ReflectionCatalogs> {
  const [passagesFile, charactersFile, songsFile, quotesFile, landscapesFile] = await Promise.all([
    readJson<{ passages: ReflectionPassage[] }>("reflection-passages.json"),
    readJson<{ characters: ReflectionCharacter[] }>("reflection-characters.json"),
    readJson<{ songs: ReflectionSong[] }>("reflection-songs.json"),
    readJson<{ quotes: ReflectionQuote[] }>("reflection-quotes.json"),
    readJson<{ landscapes: ReflectionLandscape[] }>("reflection-landscapes.json"),
  ])

  return {
    passages: passagesFile.passages,
    characters: charactersFile.characters,
    songs: songsFile.songs,
    quotes: quotesFile.quotes,
    landscapes: landscapesFile.landscapes,
  }
}

export function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2)
}

const SYNONYMS: Record<string, string[]> = {
  anxiety: ["anxiety", "anxious", "worry", "worried", "fear", "afraid", "overwhelm", "stressed", "stress"],
  schoolwork: ["school", "schoolwork", "homework", "study", "studies", "exam", "class", "students", "learning"],
  change: ["change", "changes", "lifechanges", "transition", "moving", "new", "uncertain", "uncertainty"],
  grief: ["grief", "loss", "mourning", "sad", "tears", "death"],
  guilt: ["guilt", "shame", "failure", "failed", "regret"],
  exhaustion: ["tired", "exhaustion", "burnout", "weary", "weariness", "overwhelm"],
  loneliness: ["lonely", "loneliness", "alone", "isolated"],
  courage: ["courage", "brave", "fear", "pressure"],
  hope: ["hope", "hopeful", "discouraged", "despair"],
  prayer: ["prayer", "pray", "seeking"],
}

export function expandQueryTokens(query: string): Set<string> {
  const tokens = tokenizeQuery(query)
  const expanded = new Set(tokens)
  const joined = tokens.join(" ")

  for (const [canonical, variants] of Object.entries(SYNONYMS)) {
    if (variants.some((variant) => joined.includes(variant) || tokens.includes(variant))) {
      expanded.add(canonical)
      for (const variant of variants) expanded.add(variant)
    }
  }

  return expanded
}

function scoreTags(tags: string[], queryTokens: Set<string>, extraText = ""): number {
  const haystack = `${tags.join(" ")} ${extraText}`.toLowerCase()
  let score = 0
  for (const token of queryTokens) {
    if (tags.some((tag) => tag.toLowerCase() === token)) score += 4
    else if (tags.some((tag) => tag.toLowerCase().includes(token))) score += 2
    else if (haystack.includes(token)) score += 1
  }
  return score
}

function pickTop<T>(
  items: T[],
  scorer: (item: T) => number,
  prefer?: (item: T) => boolean
): T {
  const ranked = items
    .map((item) => ({ item, score: scorer(item) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (prefer) {
        const ap = prefer(a.item) ? 1 : 0
        const bp = prefer(b.item) ? 1 : 0
        return bp - ap
      }
      return 0
    })
  return ranked[0]?.item ?? items[0]
}

export function matchCatalogsHeuristic(query: string, catalogs: ReflectionCatalogs) {
  const tokens = expandQueryTokens(query)

  const passage = pickTop(
    catalogs.passages,
    (item) => {
      const base = scoreTags(item.tags, tokens, `${item.twoWordSummary} ${item.sentenceTheme}`)
      return base + (item.isFree ? Math.max(2.5, base * 0.15) : 0)
    },
    (item) => Boolean(item.isFree)
  )

  const characterByTheme = pickTop(catalogs.characters, (item) => {
    const name = item.name.toLowerCase()
    const theme = `${item.twoWordTheme} ${item.meaning}`.toLowerCase()
    let score = 0
    if (tokens.has("anxiety") || tokens.has("worry") || tokens.has("fear") || tokens.has("overwhelm")) {
      if (/^(elijah|martha|david|hannah|peter|job)$/.test(name)) score += 8
      if (/fear|weep|anxiety|care|tired|desert|shepherd/.test(theme)) score += 3
    }
    if (tokens.has("schoolwork") || tokens.has("students") || tokens.has("learning") || tokens.has("study")) {
      if (/^(daniel|timothy|ezra|solomon)$/.test(name)) score += 8
      if (/wisdom|learn|stud|youth|dream|wise/.test(theme)) score += 3
    }
    if (tokens.has("change") || tokens.has("lifechanges") || tokens.has("transition")) {
      if (/^(abraham|ruth|moses|paul|joseph)$/.test(name)) score += 6
      if (/journey|call|exile|change|new|guardian/.test(theme)) score += 2
    }
    if (tokens.has("grief") || tokens.has("loss") || tokens.has("mourning")) {
      if (/^(job|ruth|mary|martha|hannah)$/.test(name)) score += 8
    }
    if (tokens.has("exhaustion") || tokens.has("burnout") || tokens.has("weariness")) {
      if (/^(elijah|moses|martha)$/.test(name)) score += 8
    }
    return score || scoreTags([], tokens, `${name} ${theme}`)
  })

  const song = pickTop(catalogs.songs, (item) => scoreTags(item.tags, tokens, `${item.title} ${item.artist}`))
  const quote = pickTop(catalogs.quotes, (item) =>
    scoreTags(item.tags, tokens, `${item.text} ${item.attribution}`)
  )
  const landscape = pickTop(catalogs.landscapes, (item) =>
    scoreTags(item.tags, tokens, `${item.moodLabel} ${item.book}`)
  )

  return {
    passage,
    character: characterByTheme,
    song,
    quote,
    landscape,
  }
}

export function catalogsForPrompt(catalogs: ReflectionCatalogs) {
  return {
    passages: catalogs.passages.map((p) => ({
      id: p.id,
      book: p.book,
      chapter: p.chapter,
      theme: p.twoWordSummary,
      summary: p.sentenceTheme,
      tags: p.tags,
      isFree: p.isFree,
    })),
    characters: catalogs.characters.map((c) => ({
      name: c.name,
      theme: c.twoWordTheme,
      range: c.referenceRange,
      meaning: c.meaning,
    })),
    songs: catalogs.songs.map((s) => ({
      id: s.id,
      title: s.title,
      artist: s.artist,
      type: s.type,
      tags: s.tags,
    })),
    quotes: catalogs.quotes.map((q) => ({
      id: q.id,
      text: q.text,
      attribution: q.attribution,
      tags: q.tags,
    })),
    landscapes: catalogs.landscapes.map((l) => ({
      id: l.id,
      book: l.book,
      mood: l.moodLabel,
      tags: l.tags,
    })),
  }
}
