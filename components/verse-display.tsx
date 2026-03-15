"use client"

import { useMemo, useState, useEffect } from "react"
import type { Verse, HighlightedWord } from "@/lib/bible-data"
import type { VerseArtPainting } from "@/lib/verse-art"
import { getVerseArt } from "@/lib/verse-art"

interface VerseDisplayProps {
  verse: Verse
  book: string
  chapter: number
  onWordTap: (word: HighlightedWord) => void
  onArtClick?: (painting: VerseArtPainting) => void
}

// Christian Cross SVG Component
function ChristianCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Vertical bar */}
      <rect x="40" y="10" width="20" height="120" rx="2" />
      {/* Horizontal bar */}
      <rect x="20" y="45" width="60" height="20" rx="2" />
    </svg>
  )
}

export function VerseDisplay({ verse, book, chapter, onWordTap, onArtClick }: VerseDisplayProps) {
  const [isRead, setIsRead] = useState(false)
  const [artPainting, setArtPainting] = useState<VerseArtPainting | null>(null)
  const [isLoadingArt, setIsLoadingArt] = useState(true)
  const [artClicked, setArtClicked] = useState(false)

  // Load read status from localStorage on mount
  useEffect(() => {
    const verseKey = `verse-read-${book}-${chapter}-${verse.verse || verse.verseNumber}`
    const saved = localStorage.getItem(verseKey)
    setIsRead(saved === 'true')
  }, [verse, book, chapter])

  // Load art for this verse on mount
  useEffect(() => {
    const loadArt = async () => {
      try {
        const verseNum = verse.verse || verse.verseNumber
        console.log("[v0] ==================== LOADING ART ====================")
        console.log("[v0] Book:", book, "Chapter:", chapter, "VerseNum:", verseNum)
        const art = await getVerseArt(book, chapter, verseNum)
        console.log("[v0] Art Result:", art)
        setArtPainting(art)
      } catch (error) {
        console.error("[v0] ERROR in loadArt:", error)
      } finally {
        setIsLoadingArt(false)
      }
    }

    loadArt()
  }, [verse, book, chapter])

  const handleMarkRead = () => {
    const verseKey = `verse-read-${book}-${chapter}-${verse.verse || verse.verseNumber}`
    const newState = !isRead
    setIsRead(newState)
    localStorage.setItem(verseKey, String(newState))
  }

  const handleArtClick = () => {
    setArtClicked(true)
    if (artPainting && onArtClick) {
      onArtClick(artPainting)
    }
  }

  const renderedText = useMemo(() => {
    const text = verse.text
    const highlightedWords = verse.highlightedWords

    // Create a map of lowercase word to highlighted word data
    const wordMap = new Map<string, HighlightedWord>()
    highlightedWords.forEach((hw) => {
      wordMap.set(hw.word.toLowerCase(), hw)
    })

    // Split text into words while preserving punctuation
    const parts: { text: string; isHighlighted: boolean; wordData?: HighlightedWord }[] = []

    // Regex to split by word boundaries while keeping punctuation attached
    const words = text.split(/(\s+)/)

    words.forEach((segment) => {
      if (/^\s+$/.test(segment)) {
        // Whitespace
        parts.push({ text: segment, isHighlighted: false })
      } else {
        // Check if this word (stripped of punctuation) is highlighted
        const cleanWord = segment.replace(/[.,;:!?'"()]/g, "").toLowerCase()
        const wordData = wordMap.get(cleanWord)

        if (wordData) {
          parts.push({ text: segment, isHighlighted: true, wordData })
        } else {
          parts.push({ text: segment, isHighlighted: false })
        }
      }
    })

    return parts
  }, [verse])

  return (
    <div className="py-4 border-b border-border/50 last:border-b-0">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-1">
          {verse.highlightedWords.map((hw, i) => (
            <span key={i} className="flex items-center">
              <button
                onClick={() => onWordTap(hw)}
                className="text-highlight-text bg-highlight px-3 py-1.5 rounded font-semibold text-base
                         hover:bg-accent hover:text-accent-foreground transition-colors
                         focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                         min-h-[44px] inline-flex items-center"
                aria-label={`View meaning of "${hw.word}"`}
              >
                {hw.word}
              </button>
              {i < verse.highlightedWords.length - 1 && <span className="text-muted-foreground mx-1">·</span>}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground opacity-60">— tap to explore</span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <p className="font-serif text-xl leading-relaxed text-white flex-1">
          <span className="text-base font-sans mr-2 select-none opacity-75">{verse.verse || verse.verseNumber}</span>
          {renderedText.map((part, index) =>
            part.isHighlighted ? (
              <strong key={index} className="font-bold text-yellow-200">
                {part.text}
              </strong>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </p>

        <div className="flex-shrink-0 flex items-center gap-1">
          {/* Purple Easter Egg Cross - Visible when art is available */}
          {artPainting && (
            <button
              onClick={handleArtClick}
              className={`flex items-center justify-center rounded transition-all duration-300 min-h-[32px] min-w-[32px] flex-shrink-0 ${
                artClicked
                  ? 'text-purple-300 opacity-100'
                  : 'text-purple-500 opacity-50 hover:opacity-75'
              }`}
              aria-label="Easter Egg: Click to view hidden art"
              title="Easter Egg - Click to reveal art!"
            >
              <ChristianCross className="w-5 h-5" />
            </button>
          )}

          {/* Standard Read Marker Cross */}
          <button
            onClick={handleMarkRead}
            className={`flex-shrink-0 transition-all duration-300 min-h-[32px] min-w-[32px] flex items-center justify-center rounded ${
              isRead
                ? 'text-amber-400 opacity-100'
                : 'text-gray-400 opacity-40 hover:opacity-60'
            }`}
            aria-label={isRead ? "Mark verse as unread" : "Mark verse as read"}
            title={isRead ? "Marked as read" : "Click to mark as read"}
          >
            <ChristianCross className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
