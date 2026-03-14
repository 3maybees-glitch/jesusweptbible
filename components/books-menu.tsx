"use client"

import { useState } from "react"
import { Book, Info } from "lucide-react"
import { bibleBooks, type Book as BookType } from "@/lib/bible-data"
import { ThemeSheet } from "@/components/theme-sheet"
import { DevotionalPage } from "@/components/devotional-page"
import { BookTheme } from "@/lib/book-themes"

interface BooksMenuProps {
  onSelectBook: (bookName: string) => void
  onAbout: () => void
  currentBook: string | null
}

// Bible-Wide Two-Word Theme
const bibleTheme: BookTheme = {
  book: "Entire Bible",
  theme: "Jesus Messiah",
  words: [
    {
      word: "Jesus",
      strongNumber: "G2424",
      language: "Greek",
      lemma: "Iēsous",
      meaning: "Jesus; 'Yahweh saves.' The incarnate Son of God and promised Savior who fulfills the Law, the Prophets, and the covenant promises of the Old Testament. The central figure of all Scripture.",
    },
    {
      word: "Messiah",
      strongNumber: "H4899",
      language: "Hebrew",
      lemma: "Mashiach",
      meaning: "The Anointed One promised by God; the divinely appointed king, priest, and deliverer foretold throughout the Old Testament and fulfilled in Jesus Christ. The culmination of God's redemptive plan for humanity.",
    },
  ],
}

// Old Testament Two-Word Theme
const otTheme: BookTheme = {
  book: "Old Testament",
  theme: "Covenant LORD",
  words: [
    {
      word: "Covenant",
      strongNumber: "H1285",
      language: "Hebrew",
      lemma: "berith",
      meaning: "A binding agreement, alliance, or divine covenant establishing relationship between God and His people; the foundational framework of God's promises throughout the Old Testament. The covenant represents God's sovereign commitment to His people and their obligations of faithfulness.",
    },
    {
      word: "LORD",
      strongNumber: "H3068",
      language: "Hebrew",
      lemma: "YHWH (Yehovah)",
      meaning: "The covenant name of God revealed to Israel at Mount Sinai; 'the Self-Existent One' or 'He Who Is.' The personal divine name expressing God's eternal being, immutable character, and faithful relationship with His covenant people. Represents God's transcendence, holiness, and redemptive purpose.",
    },
  ],
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
  const [showDevotional, setShowDevotional] = useState(false)
  const [testament, setTestament] = useState<"OT" | "NT">("NT")
  const [selectedTheme, setSelectedTheme] = useState<"bible" | "testament">("testament")

  const filteredBooks = bibleBooks.filter((b) => b.testament === testament)
  const books = testament === "NT" ? filteredBooks : filteredBooks

  // Group books by category based on testament
  let sections: Array<{ label: string; books: BookType[] }> = []

  if (testament === "NT") {
    const gospels = books.filter((b) =>
      ["Matthew", "Mark", "Luke", "John"].includes(b.name)
    )
    const history = books.filter((b) => b.name === "Acts")
    const pauline = books.filter((b) =>
      [
        "Romans", "1 Corinthians", "2 Corinthians", "Galatians",
        "Ephesians", "Philippians", "Colossians",
        "1 Thessalonians", "2 Thessalonians",
        "1 Timothy", "2 Timothy", "Titus", "Philemon",
      ].includes(b.name)
    )
    const general = books.filter((b) =>
      ["Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"].includes(b.name)
    )
    const prophecy = books.filter((b) => b.name === "Revelation")

    sections = [
      { label: "Gospels", books: gospels },
      { label: "History", books: history },
      { label: "Pauline Epistles", books: pauline },
      { label: "General Epistles", books: general },
      { label: "Prophecy", books: prophecy },
    ]
  } else {
    // Old Testament groupings
    const law = books.filter((b) =>
      ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"].includes(b.name)
    )
    const history = books.filter((b) =>
      ["Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"].includes(b.name)
    )
    const poetry = books.filter((b) =>
      ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"].includes(b.name)
    )
    const majorProphets = books.filter((b) =>
      ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"].includes(b.name)
    )
    const minorProphets = books.filter((b) =>
      ["Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"].includes(b.name)
    )

    sections = [
      { label: "Law", books: law },
      { label: "History", books: history },
      { label: "Poetry", books: poetry },
      { label: "Major Prophets", books: majorProphets },
      { label: "Minor Prophets", books: minorProphets },
    ]
  }

  return (
    <div className="min-h-screen relative">
      {/* Background overlay for readability - lighter opacity to show background image */}
      <div className="fixed inset-0 bg-gradient-to-b from-overlay-light/40 via-overlay-light/45 to-overlay-light/50 pointer-events-none z-0" />
      
      {/* Show Devotional Page if open */}
      {showDevotional && <DevotionalPage onBack={() => setShowDevotional(false)} />}
      
      {/* Show Books Menu if Devotional is not open */}
      {!showDevotional && (
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-5">
            {/* Testament Toggle */}
            <div className="flex gap-3 mb-4 justify-center">
              <button
                onClick={() => setTestament("OT")}
                className={`px-6 py-2 rounded-lg font-serif font-semibold transition-colors ${
                  testament === "OT"
                    ? "bg-primary text-white"
                    : "bg-[#D4A574] hover:bg-[#C4956A] text-white"
                }`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setTestament("NT")}
                className={`px-6 py-2 rounded-lg font-serif font-semibold transition-colors ${
                  testament === "NT"
                    ? "bg-primary text-white"
                    : "bg-[#D4A574] hover:bg-[#C4956A] text-white"
                }`}
              >
                New Testament
              </button>
            </div>

            {/* Decorative element */}
            <div className="flex justify-center mb-2">
              <svg className="w-8 h-3 text-primary/30" viewBox="0 0 32 12" fill="none">
                <path d="M0,6 L8,6 M24,6 L32,6" stroke="currentColor" strokeWidth="1" />
                <path d="M12,6 L16,2 L20,6 L16,10 Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-foreground text-center text-balance">
              {testament === "NT" ? "New Testament" : "Old Testament"}
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              {testament === "NT" ? "27 Books - King James Version" : "39 Books - King James Version"}
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
          {/* Theme Selection Tabs */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setSelectedTheme("bible")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                selectedTheme === "bible"
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              aria-label="View Bible-wide theme"
            >
              Bible Theme
            </button>
            <button
              onClick={() => setSelectedTheme("testament")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                selectedTheme === "testament"
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              aria-label="View Testament theme"
            >
              Testament Theme
            </button>
          </div>

          {/* Bible-Wide Theme Box */}
          {selectedTheme === "bible" && (
            <div className="mb-8">
              <button
                onClick={() => setShowThemeSheet(true)}
                className="w-full flex flex-col gap-2 p-6 rounded-lg bg-gradient-to-r from-[#8B4513] to-[#6B3410] hover:from-[#7A3A09] hover:to-[#5A2A00] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-lg backdrop-blur-sm"
                aria-label="View Bible theme: Jesus Messiah"
              >
                <span className="text-sm font-medium text-white/90 tracking-wide">Entire Bible Two-Word Theme</span>
                <span className="text-3xl font-bold text-white font-serif">Jesus Messiah</span>
              </button>
            </div>
          )}

          {/* Testament Two-Word Theme Box - Show based on selection and testament */}
          {selectedTheme === "testament" && testament === "OT" && (
            <div className="mb-8">
              <button
                onClick={() => setShowThemeSheet(true)}
                className="w-full flex flex-col gap-2 p-6 rounded-lg bg-[#8B6F47]/90 hover:bg-[#7A5F38] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-lg backdrop-blur-sm"
                aria-label="View Old Testament theme: Covenant LORD"
              >
                <span className="text-sm font-medium text-white/90 tracking-wide">Old Testament Two-Word Theme</span>
                <span className="text-3xl font-bold text-white font-serif">Covenant LORD</span>
              </button>
            </div>
          )}
          {selectedTheme === "testament" && testament === "NT" && (
            <div className="mb-8">
              <button
                onClick={() => setShowThemeSheet(true)}
                className="w-full flex flex-col gap-2 p-6 rounded-lg bg-[#6B2C3E]/90 hover:bg-[#5A1F30] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-lg backdrop-blur-sm"
                aria-label="View New Testament theme: Jesus Christ"
              >
                <span className="text-sm font-medium text-white/90 tracking-wide">New Testament Two-Word Theme</span>
                <span className="text-3xl font-bold text-white font-serif">Jesus Christ</span>
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="mb-8 border-b border-border/30" />

          {sections.map((section) => (
            <div key={section.label} className="mb-8">
              <div className="bg-[#8B5A6B]/80 border border-[#6B3A4B] rounded-lg px-3 py-2 mb-3">
                <h2 className="font-serif text-sm uppercase tracking-widest text-white font-semibold">
                  {section.label}
                </h2>
              </div>
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

          {/* Devotional Button - Above About Button */}
          <div className="mt-12 pt-8 border-t border-border/30 space-y-3">
            <a
              href="/characters"
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground border border-border transition-colors min-h-[48px] font-serif font-medium"
              aria-label="Bible Character Explorer"
            >
              <span>Bible Character Explorer</span>
            </a>
            
            <button
              onClick={() => setShowDevotional(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-[#8B6B47] hover:bg-[#7A5A3A] text-white border border-border transition-colors min-h-[48px] font-serif font-medium"
              aria-label="Read the Meaning and Motivation for Bible Reading Devotional"
            >
              <span>Meaning & Motivation for Bible Reading</span>
            </button>
            
            <button
              onClick={onAbout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-secondary hover:bg-secondary/80 text-card-foreground border border-border transition-colors min-h-[48px]"
            >
              <Info className="w-4 h-4" />
              <span className="font-serif text-base font-medium">About & Details</span>
            </button>
          </div>
        </main>

        {/* Theme Sheet for Themes */}
        <ThemeSheet
          theme={showThemeSheet ? (selectedTheme === "bible" ? bibleTheme : (testament === "OT" ? otTheme : ntTheme)) : null}
          isOpen={showThemeSheet}
          onClose={() => setShowThemeSheet(false)}
        />
      </div>
      )}
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
