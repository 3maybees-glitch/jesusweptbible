"use client"

import { useState } from "react"
import { ChevronLeft, Book, X, Lock } from "lucide-react"
import { bibleBooks, type Book as BookType } from "@/lib/bible-data"
import { getThemeByBook, type BookTheme } from "@/lib/book-themes"
import { ThemeBox } from "./theme-box"
import { ThemeSheet } from "./theme-sheet"
import { usePremium } from "@/hooks/use-premium"
import { isBookUnlocked, isFreeBook } from "@/lib/is-book-unlocked"

interface BookSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectChapter: (book: string, chapter: number) => void
  currentBook?: string
  currentChapter?: number
}

export function BookSelector({ isOpen, onClose, onSelectChapter, currentBook, currentChapter }: BookSelectorProps) {
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null)
  const [view, setView] = useState<"books" | "chapters" | "themes">("books")
  const [testament, setTestament] = useState<"OT" | "NT">("NT")
  const [selectedTheme, setSelectedTheme] = useState<BookTheme | null>(null)
  const [isThemeSheetOpen, setIsThemeSheetOpen] = useState(false)
  
  const { isPremium } = usePremium()

  const handleBookSelect = (book: BookType) => {
    setSelectedBook(book)
    setView("chapters")
  }

  const handleChapterSelect = (chapter: number) => {
    if (selectedBook) {
      // Show themes view instead of closing
      setView("themes")
    }
  }

  const handleThemeSelect = (theme: BookTheme) => {
    setSelectedTheme(theme)
    setIsThemeSheetOpen(true)
  }

  const handleDoneWithThemes = () => {
    if (selectedBook) {
      onSelectChapter(selectedBook.name, 1)
      onClose()
      // Reset state
      setTimeout(() => {
        setView("books")
        setSelectedBook(null)
        setSelectedTheme(null)
      }, 300)
    }
  }

  const handleBack = () => {
    if (view === "themes") {
      setView("chapters")
      setSelectedTheme(null)
    } else {
      setView("books")
      setSelectedBook(null)
    }
  }

  if (!isOpen) return null

  const otBooks = bibleBooks.filter((b) => b.testament === "OT")
  const ntBooks = bibleBooks.filter((b) => b.testament === "NT")

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Full Screen Selector */}
      <div className="fixed inset-0 z-50 bg-background animate-in slide-in-from-bottom duration-300">
        {/* Header with decorative design */}
        <header className="sticky top-0 bg-background border-b border-border overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner flourishes */}
            <svg className="absolute top-0 left-0 w-24 h-24 text-primary/10" viewBox="0 0 100 100" fill="none">
              <path d="M0,50 Q0,0 50,0 M0,70 Q0,20 30,10 M0,90 Q0,40 20,20" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="15" cy="15" r="3" fill="currentColor" />
            </svg>
            <svg className="absolute top-0 right-0 w-24 h-24 text-primary/10 scale-x-[-1]" viewBox="0 0 100 100" fill="none">
              <path d="M0,50 Q0,0 50,0 M0,70 Q0,20 30,10 M0,90 Q0,40 20,20" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="15" cy="15" r="3" fill="currentColor" />
            </svg>
            {/* Center decorative line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>

          <div className="relative px-4 py-5 flex items-center justify-between">
            {view === "chapters" ? (
              <button onClick={handleBack} className="flex items-center gap-1 text-accent min-h-[44px] min-w-[44px]">
                <ChevronLeft className="w-5 h-5" />
                <span>Books</span>
              </button>
          ) : view === "themes" ? (
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">Select a theme to learn more</p>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 gap-3">
                {selectedBook && getThemeByBook(selectedBook.name) && (
                  <ThemeBox 
                    theme={getThemeByBook(selectedBook.name)!} 
                    onSelectTheme={handleThemeSelect}
                  />
                )}
              </div>

              {/* Done Button */}
              <button
                onClick={handleDoneWithThemes}
                className="w-full mt-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium transition-colors hover:bg-accent/90 min-h-[44px]"
              >
                Done
              </button>
            </div>
          ) : (
              <div className="w-20" />
            )}

            <div className="flex flex-col items-center gap-1">
              {/* Small decorative element above title */}
              <svg className="w-8 h-3 text-primary/30" viewBox="0 0 32 12" fill="none">
                <path d="M0,6 L8,6 M24,6 L32,6" stroke="currentColor" strokeWidth="1" />
                <path d="M12,6 L16,2 L20,6 L16,10 Z" fill="currentColor" />
              </svg>
              <h2 className="font-serif text-xl text-foreground">
                {view === "books" ? "Select Book" : view === "chapters" ? selectedBook?.name : `${selectedBook?.name} Theme`}
              </h2>
              {/* Small decorative element below title */}
              <svg className="w-16 h-2 text-primary/30" viewBox="0 0 64 8" fill="none">
                <path d="M0,4 C16,4 16,1 32,1 C48,1 48,4 64,4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="overflow-auto h-[calc(100vh-65px)]">
          {view === "books" ? (
            <div className="p-4">
              {/* Testament Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setTestament("OT")}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    testament === "OT" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  Old Testament
                </button>
                <button
                  onClick={() => setTestament("NT")}
                  className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                    testament === "NT" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  New Testament
                </button>
              </div>

              {/* Book List */}
              <div className="grid grid-cols-2 gap-2">
                {(testament === "OT" ? otBooks : ntBooks).map((book) => {
                  const unlocked = isBookUnlocked(book.name, isPremium)
                  const isFree = isFreeBook(book.name)
                  return (
                    <button
                      key={book.name}
                      onClick={() => handleBookSelect(book)}
                      className={`p-4 rounded-lg text-left transition-colors flex items-center gap-3 relative ${
                        currentBook === book.name
                          ? "bg-accent text-accent-foreground"
                          : unlocked
                            ? "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                            : "bg-secondary/60 hover:bg-secondary/50 text-secondary-foreground/70"
                      }`}
                    >
                      <Book className={`w-4 h-4 flex-shrink-0 ${unlocked ? "opacity-60" : "opacity-30"}`} />
                      <span className={`text-sm font-medium truncate ${!unlocked ? "opacity-70" : ""}`}>
                        {book.name}
                      </span>
                      {!unlocked && (
                        <Lock className="w-3 h-3 text-muted-foreground/60 absolute top-2 right-2" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">{selectedBook?.chapters} chapters</p>

              {/* Chapter Grid */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: selectedBook?.chapters || 0 }, (_, i) => i + 1).map((chapter) => (
                  <button
                    key={chapter}
                    onClick={() => handleChapterSelect(chapter)}
                    className={`aspect-square rounded-lg font-medium transition-colors flex items-center justify-center text-lg ${
                      currentBook === selectedBook?.name && currentChapter === chapter
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {chapter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Theme Sheet */}
      <ThemeSheet 
        theme={selectedTheme} 
        isOpen={isThemeSheetOpen} 
        onClose={() => setIsThemeSheetOpen(false)} 
      />
    </>
  )
}
