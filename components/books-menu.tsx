"use client"

import { useState } from "react"
import { Book, Info } from "lucide-react"
import { bibleBooks, type Book as BookType } from "@/lib/bible-data"
import { ThemeSheet } from "@/components/theme-sheet"
import { BookTheme } from "@/lib/book-themes"

interface BooksMenuProps {
  onSelectBook: (bookName: string) => void
  onAbout: () => void
  currentBook: string | null
}

// New Testament Two-Word Theme
const ntTheme: BookTheme = {
  book: "New Testament",
  theme: "Jesus Christ",
  words: [
    {
      word: "Jesus",
      strongNumber: "G2424",
      language: "Greek",
      lemma: "Iēsous",
      meaning: "Jesus; literally 'Yahweh saves' - the divine name combined with salvation. Jesus is the incarnate Son of God, the Messiah promised throughout the Old Testament. He is God in human form, come to die for the sins of humanity and offer eternal redemption through faith.",
    },
    {
      word: "Christ",
      strongNumber: "G5547",
      language: "Greek",
      lemma: "Christos",
      meaning: "Christ; the Anointed One; the Messiah. Derived from the Greek word meaning 'to anoint.' In the Old Testament, kings, priests, and prophets were anointed with oil as a sign of God's selection and blessing. Jesus is the ultimate Anointed One - fully God and fully human - sent by God the Father to accomplish redemption and establish His kingdom.",
    },
  ],
}

export function BooksMenu({ onSelectBook, onAbout, currentBook }: BooksMenuProps) {
  const [showThemeSheet, setShowThemeSheet] = useState(false)

  const ntBooks = bibleBooks.filter((b) => b.testament === "NT")

  // Group books by category for visual organization
  const gospels = ntBooks.filter((b) =>
    ["Matthew", "Mark", "Luke", "John"].includes(b.name)
  )
  const history = ntBooks.filter((b) => b.name === "Acts")
  const pauline = ntBooks.filter((b) =>
    [
      "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
      "Ephesians", "Philippians", "Colossians",
      "1 Thessalonians", "2 Thessalonians",
      "1 Timothy", "2 Timothy", "Titus", "Philemon",
    ].includes(b.name)
  )
  const general = ntBooks.filter((b) =>
    ["Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"].includes(b.name)
  )
  const prophecy = ntBooks.filter((b) => b.name === "Revelation")

  const sections = [
    { label: "Gospels", books: gospels },
    { label: "History", books: history },
    { label: "Pauline Epistles", books: pauline },
    { label: "General Epistles", books: general },
    { label: "Prophecy", books: prophecy },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background overlay for readability - lighter opacity to show background image */}
      <div className="fixed inset-0 bg-gradient-to-b from-overlay-light/40 via-overlay-light/45 to-overlay-light/50 pointer-events-none z-0" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-5">
            {/* Decorative element */}
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-3 text-primary/30" viewBox="0 0 32 12" fill="none">
                <path d="M0,6 L8,6 M24,6 L32,6" stroke="currentColor" strokeWidth="1" />
                <path d="M12,6 L16,2 L20,6 L16,10 Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-foreground text-center text-balance">
              New Testament
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              27 Books - King James Version
            </p>
            {/* Bottom decorative element */}
            <div className="flex justify-center mt-2">
              <svg className="w-16 h-2 text-primary/30" viewBox="0 0 64 8" fill="none">
                <path d="M0,4 C16,4 16,1 32,1 C48,1 48,4 64,4" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </header>

        {/* Book Sections */}
        <main className="px-4 py-6 pb-12 max-w-lg mx-auto">
          {/* New Testament Two-Word Theme Box */}
          <div className="mb-8">
            <button
              onClick={() => setShowThemeSheet(true)}
              className="w-full flex flex-col gap-2 p-4 rounded-lg bg-[#6B2C3E] hover:bg-[#5A1F30] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-md"
              aria-label="View New Testament theme: Jesus Christ"
            >
              <span className="text-sm font-medium text-white/80">New Testament Two-Word Theme</span>
              <span className="text-2xl font-semibold text-white">Jesus Christ</span>
            </button>
          </div>

          {/* Divider */}
          <div className="mb-8 border-b border-border/30" />

          {sections.map((section) => (
            <div key={section.label} className="mb-8">
              <h2 className="font-serif text-sm uppercase tracking-widest text-muted-foreground mb-3 px-1">
                {section.label}
              </h2>
              <div className="flex flex-col gap-2">
                {section.books.map((book) => (
                  <BookButton
                    key={book.name}
                    book={book}
                    isActive={currentBook === book.name}
                    onSelect={() => onSelectBook(book.name)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* About Button - Separated */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <button
              onClick={onAbout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-secondary hover:bg-secondary/80 text-card-foreground border border-border transition-colors min-h-[48px]"
            >
              <Info className="w-4 h-4" />
              <span className="font-serif text-base font-medium">About & Details</span>
            </button>
          </div>
        </main>

        {/* Theme Sheet for NT Theme */}
        <ThemeSheet
          theme={showThemeSheet ? ntTheme : null}
          isOpen={showThemeSheet}
          onClose={() => setShowThemeSheet(false)}
        />
      </div>
    </div>
  )
}

function BookButton({
  book,
  isActive,
  onSelect,
}: {
  book: BookType
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-left transition-colors min-h-[48px] ${
        isActive
          ? "bg-accent text-accent-foreground"
          : "bg-card hover:bg-secondary text-card-foreground border border-border"
      }`}
    >
      <Book className="w-4 h-4 opacity-50 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <span className="font-serif text-base font-medium">{book.name}</span>
      </div>
      <span className={`text-xs tabular-nums ${isActive ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
        {book.chapters} {book.chapters === 1 ? "ch" : "chs"}
      </span>
    </button>
  )
}
