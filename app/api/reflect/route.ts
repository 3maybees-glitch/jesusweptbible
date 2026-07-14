import { generateText, Output } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { NextResponse } from "next/server"
import { z } from "zod"
import {
  catalogsForPrompt,
  loadReflectionCatalogs,
  matchCatalogsHeuristic,
  type ReflectionCatalogs,
} from "@/lib/reflection-data"
import { isBookUnlocked } from "@/lib/is-book-unlocked"

export const runtime = "nodejs"
export const maxDuration = 60

const requestSchema = z.object({
  query: z.string().trim().min(3).max(800),
})

const modelChoiceSchema = z.object({
  reflectionTitle: z.string().min(3).max(80),
  passage: z.object({
    id: z.string(),
    reason: z.string().min(20).max(320),
  }),
  character: z.object({
    name: z.string(),
    reason: z.string().min(20).max(320),
  }),
  song: z.object({
    id: z.string(),
    reason: z.string().min(12).max(280),
  }),
  landscape: z.object({
    id: z.string(),
    reason: z.string().min(12).max(280),
  }),
  quote: z.object({
    id: z.string(),
    reason: z.string().min(12).max(280),
  }),
})

function buildReason(query: string, label: string) {
  const short = query.length > 90 ? `${query.slice(0, 87)}...` : query
  return `This ${label} speaks into what you shared ("${short}") with language of trust, presence, and hope when life feels heavy.`
}

function resolveResponse(
  catalogs: ReflectionCatalogs,
  choice: z.infer<typeof modelChoiceSchema>,
  source: "ai" | "fallback"
) {
  const passage = catalogs.passages.find((p) => p.id === choice.passage.id)
  const character = catalogs.characters.find(
    (c) => c.name.toLowerCase() === choice.character.name.toLowerCase()
  )
  const song = catalogs.songs.find((s) => s.id === choice.song.id)
  const landscape = catalogs.landscapes.find((l) => l.id === choice.landscape.id)
  const quote = catalogs.quotes.find((q) => q.id === choice.quote.id)

  if (!passage || !character || !song || !landscape || !quote) {
    return null
  }

  return {
    source,
    reflectionTitle: choice.reflectionTitle,
    passage: {
      ...passage,
      reason: choice.passage.reason,
      isUnlockedPreview: isBookUnlocked(passage.book, false),
    },
    character: {
      ...character,
      reason: choice.character.reason,
    },
    song: {
      ...song,
      reason: choice.song.reason,
      searchQuery: `${song.title} ${song.artist}`,
    },
    landscape: {
      ...landscape,
      reason: choice.landscape.reason,
    },
    quote: {
      ...quote,
      reason: choice.quote.reason,
    },
  }
}

function fallbackResponse(query: string, catalogs: ReflectionCatalogs) {
  const match = matchCatalogsHeuristic(query, catalogs)
  return resolveResponse(
    catalogs,
    {
      reflectionTitle: "A gentle word for today",
      passage: {
        id: match.passage.id,
        reason: buildReason(query, "passage"),
      },
      character: {
        name: match.character.name,
        reason: `${match.character.name} (${match.character.twoWordTheme}) faced pressure and change that echo what you described, and God met them in it.`,
      },
      song: {
        id: match.song.id,
        reason: buildReason(query, "song"),
      },
      landscape: {
        id: match.landscape.id,
        reason: buildReason(query, "landscape"),
      },
      quote: {
        id: match.quote.id,
        reason: buildReason(query, "quote"),
      },
    },
    "fallback"
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = requestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please share a little more about what you're facing (at least a few words)." },
        { status: 400 }
      )
    }

    const { query } = parsed.data
    const catalogs = await loadReflectionCatalogs()
    const promptCatalogs = catalogsForPrompt(catalogs)

    const hasGateway =
      Boolean(process.env.AI_GATEWAY_API_KEY) ||
      Boolean(process.env.VERCEL_OIDC_TOKEN) ||
      process.env.NODE_ENV === "production"

    if (hasGateway) {
      try {
        const result = await generateText({
          model: gateway("openai/gpt-5-mini"),
          temperature: 0.4,
          system: `You are a pastoral Scripture companion for a Bible reading app called Scripture Insight / Jesus Wept.
Match the user's lived situation to catalog entries only.
Tone: warm, compassionate, non-clinical, Scripture-first. Never give medical or mental-health diagnosis.
Prefer free books (Genesis, Psalms, John) when two passages fit equally well.
Return ids/names exactly as listed in the catalogs.`,
          prompt: `User situation:
"""
${query}
"""

Choose exactly one of each from these catalogs (JSON):
${JSON.stringify(promptCatalogs)}

Rules:
- passage.id must be one of the passage ids
- character.name must match a character name exactly
- song.id, landscape.id, quote.id must match catalog ids
- each reason should briefly explain the fit in 1-2 sentences
- reflectionTitle should be a short pastoral title (3-7 words)`,
          output: Output.object({ schema: modelChoiceSchema }),
        })

        const resolved = resolveResponse(catalogs, result.output, "ai")
        if (resolved) {
          return NextResponse.json(resolved)
        }
      } catch (error) {
        console.error("Reflect AI matching failed; using fallback.", error)
      }
    }

    const fallback = fallbackResponse(query, catalogs)
    if (!fallback) {
      return NextResponse.json({ error: "Unable to build a reflection right now." }, { status: 502 })
    }

    return NextResponse.json(fallback)
  } catch (error) {
    console.error("Reflect API error", error)
    return NextResponse.json(
      { error: "Something went wrong while finding a reflection. Please try again." },
      { status: 500 }
    )
  }
}
