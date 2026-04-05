"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"

interface Character {
  name: string
  twoWordTheme?: string
  theme?: string
  referenceRange?: string
  ref?: string
  strongNumber?: string
  lemma?: string
  meaning?: string
  highlightedWords?: Array<{
    word: string
    strongNumber?: string
    lemma?: string
    meaning?: string
  }>
}

const CHARACTER_IMAGES: Record<string, string> = {
  Adam: "/images/adam.jpg",
  Moses: "/images/moses.jpg",
  Aaron: "/images/aaron.jpg",
  Abednego: "/images/abednego.jpg",
  Abel: "/images/abel.jpg",
  Abimelech: "/images/abimelech.jpg",
  Abigail: "/images/abigail.jpg",
  Abraham: "/images/abraham.jpg",
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Character | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch("/data/bible-characters.json")
        if (response.ok) {
          const data = await response.json()
          setCharacters(data.bibleCharacters || [])
          console.log("[v0] Loaded", data.bibleCharacters?.length, "characters from JSON")
        } else {
          setCharacters([])
        }
      } catch (err) {
        console.log("[v0] Error loading characters:", err)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  const displayCharacters = showAll ? filtered : filtered.slice(0, 10)

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center py-12">
        <p className="text-muted-foreground">Loading Bible characters...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bible Characters Explorer</h1>

      <input
        type="text"
        placeholder="Search Bible characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCharacters.map((person) => (
          <Card
            key={person.name}
            className="cursor-pointer hover:shadow-lg transition-all hover:border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20"
            onClick={() => setSelected(person)}
          >
            <CardContent className="p-4 space-y-2 text-center">
              {CHARACTER_IMAGES[person.name] && (
                <div className="w-full aspect-square overflow-hidden rounded-md mb-3">
                  <img
                    src={CHARACTER_IMAGES[person.name]}
                    alt={`Portrait of ${person.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <h3 className="font-semibold text-lg text-accent">{person.name}</h3>
              <p className="text-base text-foreground font-medium">
                {person.twoWordTheme || person.theme}
              </p>
              <p className="text-sm text-muted-foreground">
                {person.referenceRange || person.ref}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && filtered.length > 10 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            View Complete List ({filtered.length} characters)
          </button>
        </div>
      )}

      {showAll && filtered.length > 10 && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-2 rounded-lg border border-accent text-accent font-semibold hover:bg-accent/10 transition-colors"
          >
            Show Less
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-background to-background/95 border-2 border-accent/30 rounded-lg max-w-md w-full max-h-screen overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b-2 border-accent/20 bg-gradient-to-r from-accent/10 to-accent/5">
              <h2 className="text-2xl font-bold text-accent">{selected.name}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-accent transition-colors hover:bg-accent/10 p-2 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Portrait */}
            {CHARACTER_IMAGES[selected.name] && (
              <div className="w-full flex justify-center bg-accent/5 py-4 px-6">
                <img
                  src={CHARACTER_IMAGES[selected.name]}
                  alt={`Portrait of ${selected.name}`}
                  className="h-52 w-auto object-contain rounded-md"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-5">
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <span className="font-bold text-sm text-accent">Theme: </span>
                <span className="text-base text-foreground font-semibold">{selected.twoWordTheme || selected.theme}</span>
              </div>

              {selected.strongNumber && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Strong's Number: </span>
                  <span className="text-base text-foreground font-mono font-semibold">{selected.strongNumber}</span>
                </div>
              )}

              {selected.lemma && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Lemma: </span>
                  <span className="text-base text-foreground font-mono font-semibold">{selected.lemma}</span>
                </div>
              )}

              {selected.meaning && (
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <span className="font-bold text-sm text-accent">Meaning: </span>
                  <span className="text-sm text-foreground leading-relaxed">{selected.meaning}</span>
                </div>
              )}

              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <span className="font-bold text-sm text-accent">Story Arc: </span>
                <span className="text-sm text-foreground">{selected.referenceRange || selected.ref}</span>
              </div>

              {/* Key Terms if available */}
              {selected.highlightedWords && selected.highlightedWords.length > 0 && (
                <div className="pt-4 border-t-2 border-accent/20">
                  <p className="font-bold text-base text-accent mb-4">Key Terms</p>
                  <div className="space-y-3">
                    {selected.highlightedWords.map((word, idx) => (
                      <div key={idx} className="bg-accent/5 rounded-lg p-3 border border-accent/20">
                        <div className="font-bold text-sm text-accent mb-2">{word.word}</div>
                        {word.strongNumber && (
                          <div className="text-xs text-foreground mb-1">
                            Strong's: <span className="font-mono font-semibold text-accent">{word.strongNumber}</span>
                          </div>
                        )}
                        {word.meaning && (
                          <div className="text-xs text-foreground italic">{word.meaning}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
