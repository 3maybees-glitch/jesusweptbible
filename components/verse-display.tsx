"use client"

import { useMemo, useState, useEffect } from "react"
import type { Verse, HighlightedWord } from "@/lib/bible-data"
import type { VerseArtPainting } from "@/lib/verse-art"
import { getVerseArt } from "@/lib/verse-art"

interface VerseDisplayProps {
  verse: Verse
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

export function VerseDisplay({ verse, onWordTap, onArtClick }: VerseDisplayProps) {
  const [isRead, setIsRead] = useState(false)
  const [artPainting, setArtPainting] = useState<VerseArtPainting | null>(null)
  const [isLoadingArt, setIsLoadingArt] = useState(true)

  // Load read status from localStorage on mount
  useEffect(() => {
    const verseKey = `verse-read-${verse.book}-${verse.chapter}-${verse.verse || verse.verseNumber}`
    const saved = localStorage.getItem(verseKey)
    setIsRead(saved === 'true')
  }, [verse])

  // Load art for this verse on mount
  useEffect(() => {
    const loadArt = async () => {
      try {
        const art = await getVerseArt(verse.book, verse.chapter, verse.verse || verse.verseNumber)
        setArtPainting(art)
      } catch (error) {
        console.error("[v0] Error loading art for verse:", error)
      } finally {
        setIsLoadingArt(false)
      }
    }

    loadArt()
  }, [verse])

  const handleMarkRead = () => {
    const verseKey = `verse-read-${verse.book}-${verse.chapter}-${verse.verse || verse.verseNumber}`
    const newState = !isRead
    setIsRead(newState)
    localStorage.setItem(verseKey, String(newState))
  }

  const handleArtClick = () => {
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

        <div className="flex-shrink-0 mt-1 flex items-center gap-2">
          {/* Art Easter Egg Cross - Shows when art is available */}
          {!isLoadingArt && artPainting && (
            <button
              onClick={handleArtClick}
              className="flex items-center justify-center rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] text-purple-400 bg-purple-400/30 hover:bg-purple-400/50 hover:text-purple-200 shadow-lg glow-cross"
              aria-label="View historical Christian art"
              title="🎨 Easter Egg: Click to view art!"
            >
              <ChristianCross className="w-6 h-6" />
            </button>
          )}

          {/* Standard Read Marker Cross */}
          <button
            onClick={handleMarkRead}
            className={`flex-shrink-0 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg ${
              isRead
                ? 'text-amber-400 bg-amber-400/30 glow-cross shadow-lg'
                : 'text-muted-foreground/60 hover:text-muted-foreground/80 hover:bg-secondary/50'
            }`}
            aria-label={isRead ? "Mark verse as unread" : "Mark verse as read"}
            title={isRead ? "Marked as read" : "Click to mark as read"}
          >
            <ChristianCross className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
