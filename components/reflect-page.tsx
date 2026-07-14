"use client"

import { useState, useTransition, type ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft, BookOpen, Users, Music2, Quote, Loader2, Search } from "lucide-react"

interface ReflectResponse {
  source: "ai" | "fallback"
  reflectionTitle: string
  passage: {
    id: string
    book: string
    chapter: number
    twoWordSummary: string
    sentenceTheme: string
    reason: string
    isUnlockedPreview: boolean
  }
  character: {
    name: string
    twoWordTheme: string
    referenceRange: string
    reason: string
  }
  song: {
    id: string
    title: string
    artist: string
    type: "hymn" | "ccm"
    reason: string
    searchQuery: string
  }
  landscape: {
    id: string
    book: string
    moodLabel: string
    imagePath: string
    reason: string
  }
  quote: {
    id: string
    text: string
    attribution: string
    reason: string
  }
}

const SUGGESTIONS = [
  "I feel anxious about school and everything changing.",
  "I'm grieving and feel alone.",
  "I'm exhausted and close to burnout.",
  "I failed at something important and feel ashamed.",
  "I'm waiting on God and struggling to trust.",
]

export function ReflectPage() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<ReflectResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const runReflect = (text: string) => {
    const trimmed = text.trim()
    if (trimmed.length < 3) {
      setError("Share a few words about what you're facing.")
      return
    }

    setError(null)
    startTransition(async () => {
      try {
        const response = await fetch("/api/reflect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        })
        const data = await response.json()
        if (!response.ok) {
          setResult(null)
          setError(data.error || "Unable to find a reflection.")
          return
        }
        setResult(data as ReflectResponse)
      } catch {
        setResult(null)
        setError("Something went wrong. Please try again.")
      }
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/95 border-b border-border backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Back to Bible"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="font-serif text-lg text-foreground">Reflect</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {!result && (
          <section className="relative min-h-[70vh] flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/nature-landscape-bg.jpg')" }}
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/90 via-[#2a1f18]/55 to-[#2a1f18]/25" />

            <div className="relative z-10 px-5 pb-8 pt-24 max-w-2xl mx-auto w-full animate-in fade-in duration-700">
              <p className="font-serif text-4xl sm:text-5xl text-[#f5efe4] tracking-tight mb-3">
                Scripture Insight
              </p>
              <h2 className="font-serif text-xl sm:text-2xl text-[#f5efe4]/95 mb-2">
                What are you carrying today?
              </h2>
              <p className="text-[#f5efe4]/80 text-sm sm:text-base mb-6 max-w-md leading-relaxed">
                Type a feeling or a short story. We&apos;ll point you to Scripture, a kindred Bible character,
                a song, a landscape, and a Christian word of hope.
              </p>

              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  runReflect(query)
                }}
              >
                <label htmlFor="reflect-query" className="sr-only">
                  Describe what you are facing
                </label>
                <textarea
                  id="reflect-query"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  rows={4}
                  maxLength={800}
                  placeholder='e.g. "I had a difficult day and struggled with schoolwork, life changes, and anxiety."'
                  className="w-full rounded-lg border border-white/20 bg-[#f5efe4]/95 text-[#2a1f18] placeholder:text-[#2a1f18]/45 px-4 py-3 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#D4A574] resize-none"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-lg bg-[#8B5A6B] hover:bg-[#7a4d5c] text-white font-serif font-medium transition-colors disabled:opacity-70"
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  {isPending ? "Listening…" : "Find a reflection"}
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setQuery(suggestion)
                      runReflect(suggestion)
                    }}
                    className="text-left text-xs sm:text-sm px-3 py-2 rounded-md bg-white/10 hover:bg-white/18 text-[#f5efe4] border border-white/15 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {error && (
                <p className="mt-4 text-sm text-[#f3d4c4] bg-black/30 rounded-md px-3 py-2" role="alert">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <section className="relative min-h-[42vh] flex flex-col justify-end">
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{ backgroundImage: `url('${result.landscape.imagePath}')` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f18]/92 via-[#2a1f18]/45 to-transparent" />
              <div className="relative z-10 px-5 pb-8 pt-20 max-w-2xl mx-auto w-full">
                <p className="text-[#f5efe4]/75 text-xs uppercase tracking-[0.2em] mb-2 font-medium">
                  Nature landscape
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f5efe4] mb-2">
                  {result.reflectionTitle}
                </h2>
                <p className="text-[#f5efe4]/90 text-sm sm:text-base max-w-lg leading-relaxed">
                  {result.landscape.moodLabel}. {result.landscape.reason}
                </p>
              </div>
            </section>

            <div className="max-w-2xl mx-auto px-5 py-8 space-y-10">
              <ResultBlock
                icon={<BookOpen className="w-5 h-5" />}
                eyebrow="Scripture passage"
                title={`${result.passage.book} ${result.passage.chapter}`}
                subtitle={result.passage.twoWordSummary}
                body={result.passage.reason}
                detail={result.passage.sentenceTheme}
                action={
                  <Link
                    href={`/?book=${encodeURIComponent(result.passage.book)}&chapter=${result.passage.chapter}`}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium"
                  >
                    Open chapter
                  </Link>
                }
              />

              <ResultBlock
                icon={<Users className="w-5 h-5" />}
                eyebrow="Bible character"
                title={result.character.name}
                subtitle={result.character.twoWordTheme}
                body={result.character.reason}
                detail={result.character.referenceRange}
                action={
                  <Link
                    href="/characters"
                    className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
                  >
                    Explore characters
                  </Link>
                }
              />

              <ResultBlock
                icon={<Music2 className="w-5 h-5" />}
                eyebrow={result.song.type === "hymn" ? "Hymn" : "Christian song"}
                title={result.song.title}
                subtitle={result.song.artist}
                body={result.song.reason}
                action={
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(result.song.searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg border border-border hover:bg-secondary transition-colors font-medium"
                  >
                    Search for this song
                  </a>
                }
              />

              <ResultBlock
                icon={<Quote className="w-5 h-5" />}
                eyebrow="Christian quote"
                title={result.quote.attribution}
                body={`“${result.quote.text}”`}
                detail={result.quote.reason}
              />

              <div className="pt-2 pb-10 space-y-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => {
                    setResult(null)
                    setError(null)
                  }}
                  className="w-full min-h-[48px] rounded-lg bg-[#8B6B47] hover:bg-[#7A5A3A] text-white font-serif transition-colors"
                >
                  Reflect on something else
                </button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Reflect offers pastoral pointers from Scripture and Christian tradition — not medical or
                  clinical advice. If you are in crisis, please seek trusted help nearby.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function ResultBlock({
  icon,
  eyebrow,
  title,
  subtitle,
  body,
  detail,
  action,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  subtitle?: string
  body: string
  detail?: string
  action?: ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 text-[#8B5A6B]">
        {icon}
        <p className="text-xs uppercase tracking-[0.18em] font-medium">{eyebrow}</p>
      </div>
      <h3 className="font-serif text-2xl text-foreground leading-tight">{title}</h3>
      {subtitle && <p className="text-accent font-medium">{subtitle}</p>}
      <p className="text-foreground/90 leading-relaxed">{body}</p>
      {detail && <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>}
      {action}
    </section>
  )
}
