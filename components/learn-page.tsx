"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  Mountain,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import type { HighlightedWord } from "@/lib/bible-data"
import { WordInsightSheet } from "@/components/word-insight-sheet"

function ChristianCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="40" y="10" width="20" height="120" rx="2" />
      <rect x="20" y="45" width="60" height="20" rx="2" />
    </svg>
  )
}

const DEMO_WORDS: Record<"Jesus" | "wept", HighlightedWord> = {
  Jesus: {
    word: "Jesus",
    strongNumber: "G2424",
    language: "Greek",
    lemma: "Iēsous",
    meaning:
      "Jesus; 'Yahweh saves.' The incarnate Son of God — the central name of the Gospel and the fulfillment of every Old Testament promise.",
  },
  wept: {
    word: "wept",
    strongNumber: "G1145",
    language: "Greek",
    lemma: "dakryō",
    meaning:
      "To shed tears; to weep silently. The shortest verse in English Bibles holds the deepest compassion — God enters human grief.",
  },
}

const PYRAMID_LEVELS = [
  {
    label: "Verse",
    theme: "Jesus Wept",
    detail: "Two critical words rise from every verse.",
  },
  {
    label: "Chapter",
    theme: "Tears & Glory",
    detail: "Each chapter compresses into a two-word heartbeat.",
  },
  {
    label: "Book",
    theme: "Beloved Disciple",
    detail: "Every book carries its own two-word theme.",
  },
  {
    label: "Testament",
    theme: "Covenant LORD · Jesus Christ",
    detail: "Old and New Testament each hold a two-word key.",
  },
  {
    label: "Whole Bible",
    theme: "Jesus Messiah",
    detail: "The entire story distilled into two words.",
  },
]

const BOOK_BACKGROUNDS = [
  { book: "Genesis", src: "/backgrounds/genesis.jpg" },
  { book: "Psalms", src: "/backgrounds/psalms.jpg" },
  { book: "Isaiah", src: "/backgrounds/isaiah.jpg" },
  { book: "Matthew", src: "/backgrounds/matthew.jpg" },
  { book: "John", src: "/backgrounds/john.jpg" },
  { book: "Revelation", src: "/backgrounds/revelation.jpg" },
]

const NAV_STEPS = [
  {
    step: "01",
    title: "Pick a testament",
    body: "Start on the home menu. Switch between Old and New Testament, then open any book — each one opens inside its own landscape world.",
  },
  {
    step: "02",
    title: "Tap the golden words",
    body: "Inside a chapter, each verse highlights its two most important words. Tap one to open Strong’s meaning in Hebrew or Greek.",
  },
  {
    step: "03",
    title: "Hunt the purple crosses",
    body: "Some verses hide a soft purple cross. Tap it to reveal classic paintings of Christ, the crucifixion, and the resurrection.",
  },
  {
    step: "04",
    title: "Explore people & comfort",
    body: "Visit Character Explorer to meet Bible figures, or open Settings to turn on Dyslexia Mode for easier reading.",
  },
]

export function LearnPage() {
  const [selectedWord, setSelectedWord] = useState<HighlightedWord | null>(null)
  const [showArt, setShowArt] = useState(false)
  const [activePyramid, setActivePyramid] = useState(0)
  const [dyslexiaPreview, setDyslexiaPreview] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePyramid((prev) => (prev + 1) % PYRAMID_LEVELS.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!showArt) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowArt(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [showArt])

  return (
    <div className="learn-page min-h-screen text-foreground">
      {/* Hero — one composition, brand-first, full-bleed */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/art/resurrection.jpg')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1a120c]/55 via-[#1a120c]/70 to-[#1a120c]"
          aria-hidden="true"
        />
        <div className="learn-hero-grain absolute inset-0 pointer-events-none" aria-hidden="true" />

        <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 pt-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[#f3e6d4]/90 hover:text-[#f3e6d4] transition-colors min-h-[44px] px-1"
            aria-label="Back to Bible home"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Bible</span>
          </Link>
          <Link
            href="/characters"
            className="text-sm text-[#f3e6d4]/80 hover:text-[#f3e6d4] transition-colors min-h-[44px] inline-flex items-center"
          >
            Characters
          </Link>
        </header>

        <div
          className={`relative z-10 flex-1 flex flex-col justify-end px-5 sm:px-10 pb-14 sm:pb-20 max-w-3xl mx-auto w-full transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-serif text-[#f3e6d4] text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-5 learn-brand-glow">
            Jesus Wept Bible
          </p>
          <h1 className="font-serif text-[#e8d4b8] text-xl sm:text-2xl md:text-3xl leading-snug max-w-xl mb-4">
            Two words that unlock every verse.
          </h1>
          <p className="text-[#d9c4a8]/90 text-base sm:text-lg leading-relaxed max-w-md mb-8">
            A KJV adventure through Scripture — tap the critical words, climb the two-word summaries, and hunt hidden art along the way.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg bg-[#c4a06a] text-[#1a120c] font-semibold hover:bg-[#d4b07a] transition-colors"
            >
              See how it works
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-lg border border-[#f3e6d4]/35 text-[#f3e6d4] hover:bg-[#f3e6d4]/10 transition-colors"
            >
              Start reading
            </Link>
          </div>
        </div>
      </section>

      {/* Two-word method — interactive demo */}
      <section id="how-it-works" className="relative bg-[#1a120c] text-[#f3e6d4] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-[#c4a06a] mb-3">The method</p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight mb-4">
            Every verse keeps its two most important words.
          </h2>
          <p className="text-[#d9c4a8]/85 text-lg leading-relaxed mb-10 max-w-2xl">
            We highlight the critical pair in each verse. Tap a word and Strong&apos;s Concordance opens — the original Greek or Hebrew meaning, lemma, and number.
          </p>

          <div className="relative overflow-hidden rounded-xl border border-[#c4a06a]/25 bg-[#2a1f16]/80 px-5 py-8 sm:px-8 sm:py-10">
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center"
              style={{ backgroundImage: "url('/backgrounds/john.jpg')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#1a120c]/55" aria-hidden="true" />

            <div className="relative">
              <p className="text-sm text-[#d9c4a8]/70 mb-4">John 11:35 · try tapping the words</p>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {(Object.keys(DEMO_WORDS) as Array<keyof typeof DEMO_WORDS>).map((key, i) => (
                  <span key={key} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedWord(DEMO_WORDS[key])}
                      className="learn-word-pulse text-[#2a1f16] bg-[#e8d4b8] px-4 py-2 rounded font-semibold text-lg
                                 hover:bg-[#c4a06a] hover:text-[#1a120c] transition-colors
                                 focus:outline-none focus:ring-2 focus:ring-[#c4a06a] min-h-[44px]"
                    >
                      {key}
                    </button>
                    {i === 0 && <span className="text-[#d9c4a8]/50">·</span>}
                  </span>
                ))}
                <span className="text-xs text-[#d9c4a8]/55 ml-1">— tap to explore</span>
              </div>
              <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-[#f3e6d4]">
                <span className="text-base opacity-60 mr-2 align-top">35</span>
                <button
                  type="button"
                  onClick={() => setSelectedWord(DEMO_WORDS.Jesus)}
                  className="font-bold text-yellow-200 hover:text-[#c4a06a] transition-colors"
                >
                  Jesus
                </button>{" "}
                <button
                  type="button"
                  onClick={() => setSelectedWord(DEMO_WORDS.wept)}
                  className="font-bold text-yellow-200 hover:text-[#c4a06a] transition-colors"
                >
                  wept
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pyramid of summaries */}
      <section className="relative bg-[#f5efe4] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8b5a2b] mb-3">The climb</p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1a120c] leading-tight mb-4">
            Two-word summaries from verse to whole Bible.
          </h2>
          <p className="text-[#4a3a2a]/85 text-lg leading-relaxed mb-12 max-w-2xl">
            The same idea scales upward — chapter, book, testament, and the entire Bible each hold a two-word theme you can open and study.
          </p>

          <div className="space-y-3">
            {PYRAMID_LEVELS.map((level, index) => {
              const isActive = index === activePyramid
              return (
                <button
                  key={level.label}
                  type="button"
                  onClick={() => setActivePyramid(index)}
                  className={`w-full text-left transition-all duration-500 ease-out border-l-4 pl-5 py-4 ${
                    isActive
                      ? "border-[#8b5a2b] bg-[#ebe2d2] translate-x-1"
                      : "border-[#c4a06a]/35 hover:border-[#8b5a2b]/60 hover:bg-[#ebe2d2]/60"
                  }`}
                  style={{ maxWidth: `${100 - index * 6}%`, marginLeft: `${index * 3}%` }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#8b5a2b] font-semibold">
                      {level.label}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-[#1a120c]">{level.theme}</span>
                  </div>
                  <p
                    className={`text-sm text-[#4a3a2a]/80 mt-1 transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {level.detail}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Purple cross Easter egg */}
      <section className="relative overflow-hidden bg-[#1a120c] text-[#f3e6d4] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.28em] text-purple-300/80 mb-3">Easter egg hunt</p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight mb-4">
            Spot the purple cross. Unlock classic art.
          </h2>
          <p className="text-[#d9c4a8]/85 text-lg leading-relaxed mb-10 max-w-2xl">
            Hidden among the verses are soft purple crosses — a treasure hunt for kids, families, and art lovers. Tap one to open a masterpiece of Christ on the cross, the resurrection, and more.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            <button
              type="button"
              onClick={() => setShowArt(true)}
              className="learn-cross-pulse self-start flex items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/10 hover:bg-purple-500/20 transition-all min-h-[96px] min-w-[96px] text-purple-400"
              aria-label="Try the purple cross Easter egg"
              title="Click the purple cross"
            >
              <ChristianCross className="w-12 h-14" />
            </button>
            <div>
              <p className="font-serif text-2xl mb-2">Try it here</p>
              <p className="text-[#d9c4a8]/80 leading-relaxed max-w-md">
                Tap the purple cross to preview what you&apos;ll find while reading — Velázquez, Caravaggio, and other sacred works waiting in the text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique book backgrounds */}
      <section className="relative bg-[#f5efe4] px-5 sm:px-8 py-20 sm:py-28 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[#8b5a2b] mb-3">
            <Mountain className="w-4 h-4" />
            <p className="text-xs uppercase tracking-[0.28em]">66 living landscapes</p>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1a120c] leading-tight mb-4">
            Every book opens in its own world.
          </h2>
          <p className="text-[#4a3a2a]/85 text-lg leading-relaxed mb-10 max-w-2xl">
            Beautiful landscapes and sacred designs wrap each of the 66 books — from Eden&apos;s dawn in Genesis to the cosmic vision of Revelation — so reading feels like stepping into the story.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {BOOK_BACKGROUNDS.map((item) => (
              <figure key={item.book} className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={`${item.book} book landscape background`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 220px"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a120c]/85 to-transparent px-3 pb-3 pt-10">
                  <span className="font-serif text-[#f3e6d4] text-lg">{item.book}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Character explorer + dyslexia */}
      <section className="relative bg-[#ebe2d2] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto grid gap-16">
          <div>
            <div className="flex items-center gap-2 text-[#8b5a2b] mb-3">
              <Users className="w-4 h-4" />
              <p className="text-xs uppercase tracking-[0.28em]">Character Explorer</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1a120c] leading-tight mb-4">
              Meet the people of the story.
            </h2>
            <p className="text-[#4a3a2a]/85 text-lg leading-relaxed mb-6 max-w-2xl">
              Open Bible Character Explorer to browse figures across Scripture — each with a two-word theme and Strong&apos;s insight into their name and story.
            </p>
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-lg bg-[#6B2C3E] text-white font-medium hover:bg-[#5A1F30] transition-colors"
            >
              Open Character Explorer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#8b5a2b] mb-3">
              <Settings className="w-4 h-4" />
              <p className="text-xs uppercase tracking-[0.28em]">Read your way</p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1a120c] leading-tight mb-4">
              Dyslexia-friendly reading, one tap away.
            </h2>
            <p className="text-[#4a3a2a]/85 text-lg leading-relaxed mb-6 max-w-2xl">
              In any chapter, open Settings and turn on Dyslexia Mode. The font, spacing, and colors shift to Lexend so Scripture is easier for many dyslexic readers.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-5">
              <button
                type="button"
                onClick={() => setDyslexiaPreview((v) => !v)}
                className={`inline-flex items-center gap-2 min-h-[44px] px-5 rounded-lg border transition-colors ${
                  dyslexiaPreview
                    ? "bg-[#8b5a2b] text-white border-[#8b5a2b]"
                    : "bg-white/70 text-[#1a120c] border-[#c4a06a]/50 hover:border-[#8b5a2b]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {dyslexiaPreview ? "Dyslexia mode on" : "Preview dyslexia mode"}
              </button>
            </div>

            <p
              className={`rounded-xl border px-5 py-5 transition-all duration-300 ${
                dyslexiaPreview
                  ? "bg-amber-50 border-amber-200 text-gray-800 leading-loose tracking-wide"
                  : "bg-white/60 border-[#c4a06a]/30 text-[#1a120c] font-serif text-xl leading-relaxed"
              }`}
              style={
                dyslexiaPreview
                  ? { fontFamily: "var(--font-lexend), Lexend, Arial, sans-serif", wordSpacing: "0.12em" }
                  : undefined
              }
            >
              <span className="opacity-60 text-sm mr-2">35</span>
              Jesus wept.
            </p>
          </div>
        </div>
      </section>

      {/* How to navigate */}
      <section className="relative bg-[#2a1f16] text-[#f3e6d4] px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-[#c4a06a] mb-3">
            <BookOpen className="w-4 h-4" />
            <p className="text-xs uppercase tracking-[0.28em]">How to navigate</p>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight mb-12">
            Your path through Jesus Wept Bible.
          </h2>

          <ol className="space-y-8">
            {NAV_STEPS.map((item) => (
              <li key={item.step} className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7">
                <span className="font-serif text-3xl text-[#c4a06a] tabular-nums leading-none pt-1">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                  <p className="text-[#d9c4a8]/85 leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA — Jesus teaching (Sermon on the Mount) */}
      <section className="relative overflow-hidden px-5 sm:px-8 py-24 sm:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/art/sermon-on-the-mount.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#1a120c]/72" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto text-center text-[#f3e6d4]">
          <p className="font-serif text-4xl sm:text-6xl leading-tight mb-5">Begin the adventure.</p>
          <p className="text-[#d9c4a8]/90 text-lg mb-8 leading-relaxed">
            Open a book, step into its landscape, tap two words, find a purple cross, and watch Scripture open in a new way.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-8 rounded-lg bg-[#c4a06a] text-[#1a120c] font-semibold text-lg hover:bg-[#d4b07a] transition-colors"
          >
            Enter the Bible
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <WordInsightSheet
        word={selectedWord}
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
      />

      {showArt && (
        <>
          <div
            className="fixed inset-0 bg-black/75 z-40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowArt(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="learn-art-title"
              className="bg-[#1a120c] border border-purple-400/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 fade-in duration-300"
            >
              <div className="sticky top-0 z-10 flex items-start justify-between p-5 border-b border-purple-400/20 bg-[#1a120c]/95 backdrop-blur">
                <div>
                  <h2 id="learn-art-title" className="font-serif text-2xl sm:text-3xl text-[#f3e6d4]">
                    The Crucifixion
                  </h2>
                  <p className="text-sm text-[#d9c4a8]/70 mt-1">Diego Velázquez · 1632</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowArt(false)}
                  className="p-2 rounded-lg text-[#d9c4a8] hover:text-[#f3e6d4] hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close art preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="relative w-full aspect-[3/4] max-h-[60vh] overflow-hidden rounded-lg">
                  <Image
                    src="/art/crucifixion-velazquez.jpg"
                    alt="The Crucifixion by Diego Velázquez"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                <p className="text-[#d9c4a8]/90 leading-relaxed">
                  You found an Easter egg! While reading, purple crosses mark verses with classic Christian art —
                  crucifixion, resurrection, and sacred scenes waiting to be discovered.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
