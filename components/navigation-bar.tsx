"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, BookOpen, Users, Settings } from "lucide-react"
import { ReadingSettingsSheet } from "@/components/reading-settings-sheet"

interface NavigationBarProps {
  bookName: string
  chapter: number
  totalChapters: number
  onPrevChapter: () => void
  onNextChapter: () => void
  onOpenSelector: () => void
}

export function NavigationBar({
  bookName,
  chapter,
  totalChapters,
  onPrevChapter,
  onNextChapter,
  onOpenSelector,
}: NavigationBarProps) {
  const hasPrev = chapter > 1
  const hasNext = chapter < totalChapters
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-inset-bottom">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Previous Chapter */}
          <button
            onClick={onPrevChapter}
            disabled={!hasPrev}
            className={`p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
              hasPrev ? "hover:bg-secondary text-foreground" : "text-muted-foreground/30 cursor-not-allowed"
            }`}
            aria-label="Previous chapter"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Book/Chapter Display */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">
              {bookName} {chapter}
            </span>
          </div>

          {/* Characters Link */}
          <Link
            href="/characters"
            className="p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-secondary text-foreground"
            aria-label="Browse Bible characters"
          >
            <Users className="w-6 h-6" />
          </Link>

          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center hover:bg-secondary text-foreground"
            aria-label="Reading settings"
          >
            <Settings className="w-6 h-6" />
          </button>

          {/* Next Chapter */}
          <button
            onClick={onNextChapter}
            disabled={!hasNext}
            className={`p-3 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center ${
              hasNext ? "hover:bg-secondary text-foreground" : "text-muted-foreground/30 cursor-not-allowed"
            }`}
            aria-label="Next chapter"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <ReadingSettingsSheet isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}
