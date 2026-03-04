"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { HighlightedWord } from "@/lib/bible-data"

interface WordInsightSheetProps {
  word: HighlightedWord | null
  isOpen: boolean
  onClose: () => void
}

export function WordInsightSheet({ word, isOpen, onClose }: WordInsightSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !word) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="word-title"
        className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[70vh] overflow-auto"
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-border rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="px-6 pb-8 pt-2">
          {/* Strong's Number & Language Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-accent font-semibold">{word.strongNumber}</span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                word.language === "Greek" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {word.language}
            </span>
          </div>

          {/* Word as appears */}
          <h2 id="word-title" className="font-serif text-3xl text-foreground mb-1">
            {word.word}
          </h2>

          {/* Lemma */}
          <p className="text-2xl text-muted-foreground italic font-serif mb-6">{word.lemma}</p>

          {/* Meaning */}
          <div className="bg-secondary/50 rounded-xl p-5">
            <p className="text-foreground text-lg leading-relaxed">"{word.meaning}"</p>
          </div>
        </div>
      </div>
    </>
  )
}
