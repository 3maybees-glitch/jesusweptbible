"use client"

import { useState, useCallback } from "react"
import { ChapterView } from "@/components/chapter-view"
import { NavigationBar } from "@/components/navigation-bar"
import { BookSelector } from "@/components/book-selector"
import { BooksMenu } from "@/components/books-menu"
import { AboutPage } from "@/components/about-page"
import { ChaptersListView } from "@/components/chapters-list-view"
import { ThemeSheet } from "@/components/theme-sheet"
import { getChapter, getBookByName, sampleChapters } from "@/lib/bible-data"
import { bookThemes, type BookTheme } from "@/lib/book-themes"

export default function BibleApp() {
  const [currentBook, setCurrentBook] = useState<string | null>(null)
  const [currentChapter, setCurrentChapter] = useState(1)
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showChaptersList, setShowChaptersList] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<BookTheme | null>(null)
  const [showThemeSheet, setShowThemeSheet] = useState(false)

  const chapter = currentBook ? getChapter(currentBook, currentChapter) : null
  const book = currentBook ? getBookByName(currentBook) : null
  const bookTheme = currentBook ? bookThemes.find(t => t.book === currentBook) ?? null : null

  const handleSelectBook = useCallback((bookName: string, chapterNum?: number) => {
    setCurrentBook(bookName)
    if (chapterNum !== undefined) {
      setCurrentChapter(chapterNum)
      setShowChaptersList(false)
    } else {
      setShowChaptersList(true)
    }
  }, [])

  const handleBackToChapters = useCallback(() => {
    setShowChaptersList(true)
  }, [])

  const handleBackToMenu = useCallback(() => {
    setCurrentBook(null)
    setCurrentChapter(1)
    setShowAbout(false)
    setShowChaptersList(false)
  }, [])

  const handleSelectChapter = useCallback((bookName: string, chapterNum: number) => {
    setCurrentBook(bookName)
    setCurrentChapter(chapterNum)
  }, [])

  const handleSelectTheme = useCallback((theme: BookTheme) => {
    setSelectedTheme(theme)
    setShowThemeSheet(true)
  }, [])

  const handlePrevChapter = useCallback(() => {
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1)
    }
  }, [currentChapter])

  const handleNextChapter = useCallback(() => {
    if (book && currentChapter < book.chapters) {
      setCurrentChapter((prev) => prev + 1)
    }
  }, [book, currentChapter])

  // Show the books menu when no book is selected
  if (!currentBook) {
    if (showAbout) {
      return <AboutPage onBack={() => setShowAbout(false)} />
    }
    return <BooksMenu onSelectBook={handleSelectBook} onAbout={() => setShowAbout(true)} currentBook={currentBook} />
  }

  // Show chapters list when a book is selected but no specific chapter chosen
  if (showChaptersList) {
    return (
      <>
        <ChaptersListView
          book={book!}
          theme={bookTheme}
          onSelectChapter={(chapterNum) => handleSelectBook(currentBook, chapterNum)}
          onSelectTheme={handleSelectTheme}
          onBack={handleBackToMenu}
        />
        <ThemeSheet
          theme={selectedTheme}
          isOpen={showThemeSheet}
          onClose={() => setShowThemeSheet(false)}
        />
      </>
    )
  }

  // If no data available for this chapter, show a message
  if (!chapter) {
    return (
      <div className="min-h-screen relative">
        {/* Background overlay for readability */}
        <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col min-h-screen pb-20">
          <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
            <div className="px-4 py-4">
              <h1 className="font-serif text-2xl text-foreground text-center">
                {currentBook} {currentChapter}
              </h1>
              <p className="text-sm text-muted-foreground text-center mt-1">King James Version</p>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
            <div className="text-center max-w-sm">
              <button
                onClick={handleBackToMenu}
                className="mb-6 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium transition-colors hover:bg-accent/90 min-h-[44px]"
              >
                Back to Books
              </button>
              <p className="text-muted-foreground mb-4">This chapter is currently being built and is not yet available.</p>
              <p className="text-sm text-muted-foreground mb-6">Available chapters:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.keys(sampleChapters).map((key) => {
                  const [bookName, chap] = key.split("-")
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectChapter(bookName, Number.parseInt(chap))}
                      className="px-3 py-2 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg text-sm font-medium transition-colors"
                    >
                      {bookName} {chap}
                    </button>
                  )
                })}
              </div>
            </div>
          </main>

          <NavigationBar
            bookName={currentBook}
            chapter={currentChapter}
            totalChapters={book?.chapters || 1}
            onPrevChapter={handlePrevChapter}
            onNextChapter={handleNextChapter}
            onOpenSelector={() => setIsSelectorOpen(true)}
          />
        </div>

        <BookSelector
          isOpen={isSelectorOpen}
          onClose={() => setIsSelectorOpen(false)}
          onSelectChapter={handleSelectChapter}
          currentBook={currentBook}
          currentChapter={currentChapter}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative pb-20">
      {/* Background overlay for readability */}
      <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
      
      <div className="relative z-10">
        <ChapterView chapter={chapter} onBackToMenu={handleBackToMenu} onBackToChapters={handleBackToChapters} />
      </div>

      <NavigationBar
        bookName={currentBook}
        chapter={currentChapter}
        totalChapters={book?.chapters || 1}
        onPrevChapter={handlePrevChapter}
        onNextChapter={handleNextChapter}
        onOpenSelector={() => setIsSelectorOpen(true)}
      />

      <BookSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelectChapter={handleSelectChapter}
        currentBook={currentBook}
        currentChapter={currentChapter}
      />

      <ThemeSheet
        theme={selectedTheme}
        isOpen={showThemeSheet}
        onClose={() => setShowThemeSheet(false)}
      />
    </div>
  )
}
