"use client"

import { ArrowLeft } from "lucide-react"
import type { Book } from "@/lib/bible-data"
import type { BookTheme } from "@/lib/book-themes"
import { ThemeBox } from "@/components/theme-box"

interface ChaptersListViewProps {
  book: Book
  theme: BookTheme | null
  onSelectChapter: (chapter: number) => void
  onSelectTheme?: (theme: BookTheme) => void
  onBack: () => void
}

export function ChaptersListView({ book, theme, onSelectChapter, onSelectTheme, onBack }: ChaptersListViewProps) {
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1)

  return (
    <div className="min-h-screen relative">
      {/* Background overlay for readability */}
      <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen pb-20">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-4 flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="p-2 hover:bg-secondary rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
              aria-label="Back to books"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Book Title - Left Side */}
            <div className="text-center flex-1">
              <h1 className="font-serif text-2xl text-foreground">{book.name}</h1>
              <p className="text-sm text-muted-foreground">{book.chapters} chapters</p>
            </div>

            {/* Theme Box - Right Side */}
            {theme && onSelectTheme && (
              <div className="flex-shrink-0">
                <ThemeBox theme={theme} onSelectTheme={onSelectTheme} />
              </div>
            )}
          </div>
        </header>

        {/* Chapters Grid */}
        <main className="flex-1 px-4 py-6 pb-12 max-w-lg mx-auto w-full">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {chapters.map((chapter) => (
              <button
                key={chapter}
                onClick={() => onSelectChapter(chapter)}
                className="flex items-center justify-center py-6 px-4 rounded-lg bg-card hover:bg-accent hover:text-accent-foreground text-card-foreground border border-border transition-colors min-h-[80px] font-serif text-lg font-semibold"
              >
                {chapter}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
