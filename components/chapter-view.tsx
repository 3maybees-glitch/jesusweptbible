"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Chapter, HighlightedWord } from "@/lib/bible-data"
import type { VerseArtPainting } from "@/lib/verse-art"
import { getBackgroundUrl } from "@/lib/book-backgrounds"
import { useReadingSettings } from "@/lib/reading-settings-context"
import { VerseDisplay } from "./verse-display"
import { WordInsightSheet } from "./word-insight-sheet"
import { ArtGalleryModal } from "./art-gallery-modal"
import { Button } from "@/components/ui/button"

interface ChapterViewProps {
  chapter: Chapter
  onBackToMenu?: () => void
  onBackToChapters?: () => void
}

export function ChapterView({ chapter, onBackToMenu, onBackToChapters }: ChapterViewProps) {
  const [selectedWord, setSelectedWord] = useState<HighlightedWord | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedArt, setSelectedArt] = useState<VerseArtPainting | null>(null)
  const [isArtModalOpen, setIsArtModalOpen] = useState(false)
  const { settings } = useReadingSettings()

  // Derive reading classes from settings
  const fontSizeClass = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  }[settings.fontSize]

  const readingBgClass = settings.dyslexiaMode
    ? "bg-amber-50"
    : {
        default: "",
        sepia: "bg-amber-50/80",
        dark: "bg-gray-900",
      }[settings.readingTheme]

  const readingTextClass = settings.dyslexiaMode
    ? "text-gray-800"
    : {
        default: "",
        sepia: "text-amber-950",
        dark: "text-gray-100",
      }[settings.readingTheme]

  const dyslexiaStyle = settings.dyslexiaMode
    ? {
        fontFamily: "var(--font-lexend), 'Lexend', Arial, sans-serif",
        lineHeight: "1.85",
        letterSpacing: "0.03em",
        wordSpacing: "0.1em",
      }
    : {}

  const handleWordTap = (word: HighlightedWord) => {
    setSelectedWord(word)
    setIsSheetOpen(true)
  }

  const handleCloseSheet = () => {
    setIsSheetOpen(false)
    setTimeout(() => setSelectedWord(null), 200)
  }

  const handleArtClick = (painting: VerseArtPainting) => {
    setSelectedArt(painting)
    setIsArtModalOpen(true)
  }

  const handleCloseArtModal = () => {
    setIsArtModalOpen(false)
    setTimeout(() => setSelectedArt(null), 200)
  }

  // Flatten verses from sections if they exist (for structured chapters like Psalms 119)
  const verses = (chapter as any).sections
    ? (chapter as any).sections.flatMap((section: any) => section.verses)
    : (chapter.verses || [])

  // Get two-word summary if available
  const chapterTheme = (chapter as any).chapterTheme
  const twoWordSummary = chapterTheme?.twoWordSummary || (chapter as any).twoWordSummary
  const themeWords = chapterTheme?.themeWords || (chapter as any).themeWords
  const themeSummary = (chapter as any).themeSummary
  const sentenceTheme = (chapter as any).sentenceTheme
  const sentenceDescription = (chapter as any).sentenceDescription
  
  // Extract theme words from Acts 2 structure if needed
  const extractedThemeWords = twoWordSummary && typeof twoWordSummary === 'object' && 'wordOne' in twoWordSummary
    ? [twoWordSummary.wordOne, twoWordSummary.wordTwo]
    : themeWords || []

  // Determine if this chapter should have a background image
  const backgroundUrl = getBackgroundUrl(chapter.book)

  return (
    <div 
      className="relative flex flex-col min-h-screen book-background"
      style={{ backgroundImage: `url('${backgroundUrl}')` }}
    >
      {/* Chapter Header */}
      <header className="sticky top-0 z-50 bg-overlay-light border-b border-border/20 backdrop-blur-sm flex-shrink-0">
        <div className="px-4 py-4 relative">
          {/* Navigation Buttons */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-4">
            {onBackToMenu && (
              <button
                onClick={onBackToMenu}
                className="flex items-center gap-0.5 text-accent hover:text-accent/80 transition-colors min-h-[44px] min-w-[44px] px-2"
                aria-label="Back to books menu"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Books</span>
              </button>
            )}
          </div>
          <h1 className="font-serif text-2xl text-foreground text-center">
            {chapter.book} {chapter.chapter}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">King James Version</p>
          
          {/* Chapters Navigation Button - Right Side */}
          {onBackToChapters && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                onClick={onBackToChapters}
                className="flex items-center gap-0.5 text-accent hover:text-accent/80 transition-colors min-h-[44px] min-w-[44px] px-2"
                aria-label={`Back to ${chapter.book} chapters list`}
              >
                <span className="text-sm font-medium">Chapters</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Summary Panel - Always Visible */}
      {twoWordSummary && (
        <div className="bg-[#f0ebe4] border-b border-border/20 px-4 py-6 relative z-20 flex-shrink-0">
          {/* Sentence Description */}
          {(sentenceDescription || sentenceTheme) && (
            <p className="text-center text-sm text-foreground mb-6 italic px-4">
              {sentenceDescription || sentenceTheme}
            </p>
          )}
          
          {/* Theme Words in styled boxes */}
          {extractedThemeWords.length > 0 && (
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {extractedThemeWords.map((themeWord: any, index: number) => (
                <div key={index} className="flex items-center">
                  <button
                    onClick={() => handleWordTap(themeWord)}
                    className="text-highlight-text bg-highlight px-3 py-1.5 rounded font-semibold text-base
                             hover:bg-accent hover:text-accent-foreground transition-colors
                             focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
                             min-h-[44px] inline-flex items-center"
                    aria-label={`View meaning of "${themeWord.word}"`}
                  >
                    {themeWord.word}
                  </button>
                  {index < extractedThemeWords.length - 1 && <span className="text-muted-foreground mx-2">·</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Verses - Scrollable Content Area */}
      <main
        className={`flex-1 px-4 py-6 max-w-2xl mx-auto relative z-10 overflow-x-hidden overflow-y-auto hide-scrollbar transition-colors duration-300 ${fontSizeClass} ${readingBgClass} ${readingTextClass}`}
        style={dyslexiaStyle}
      >
        {verses && verses.length > 0 ? (
          verses.map((verse) => (
            <VerseDisplay key={`${chapter.book}-${chapter.chapter}-${verse.verseNumber || verse.verse}`} verse={verse} book={chapter.book} chapter={chapter.chapter} onWordTap={handleWordTap} onArtClick={handleArtClick} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">No verses found for this chapter.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="z-50 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-4 flex-shrink-0">
        <p className="text-xs text-muted-foreground text-center">
          {chapter.book} {chapter.chapter} - King James Version
        </p>
      </footer>

      {/* Word Insight Sheet */}
      <WordInsightSheet word={selectedWord} isOpen={isSheetOpen} onClose={handleCloseSheet} />

      {/* Art Gallery Modal */}
      <ArtGalleryModal painting={selectedArt} isOpen={isArtModalOpen} onClose={handleCloseArtModal} />
    </div>
  )
}
