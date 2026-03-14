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
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelected(person)}
          >
            <CardContent className="p-4 space-y-1">
              <h3 className="font-semibold text-foreground">{person.name}</h3>
              <p className="text-sm text-muted-foreground">
                {person.twoWordTheme || person.theme}
              </p>
              <p className="text-xs text-muted-foreground">
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
          <div className="bg-background border border-border rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-sm">
              <div>
                <span className="font-semibold text-foreground">Theme: </span>
                <span className="text-muted-foreground">{selected.twoWordTheme || selected.theme}</span>
              </div>

              {selected.strongNumber && (
                <div>
                  <span className="font-semibold text-foreground">Strong's Number: </span>
                  <span className="text-muted-foreground font-mono">{selected.strongNumber}</span>
                </div>
              )}

              {selected.lemma && (
                <div>
                  <span className="font-semibold text-foreground">Lemma: </span>
                  <span className="text-muted-foreground font-mono">{selected.lemma}</span>
                </div>
              )}

              {selected.meaning && (
                <div>
                  <span className="font-semibold text-foreground">Meaning: </span>
                  <span className="text-muted-foreground">{selected.meaning}</span>
                </div>
              )}

              <div>
                <span className="font-semibold text-foreground">Story Arc: </span>
                <span className="text-muted-foreground">{selected.referenceRange || selected.ref}</span>
              </div>

              {/* Key Terms if available */}
              {selected.highlightedWords && selected.highlightedWords.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground mb-3">Key Terms</p>
                  <div className="space-y-2">
                    {selected.highlightedWords.map((word, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="font-medium text-foreground">{word.word}</div>
                        {word.strongNumber && (
                          <div className="text-muted-foreground">
                            Strong's: <span className="font-mono">{word.strongNumber}</span>
                          </div>
                        )}
                        {word.meaning && (
                          <div className="text-muted-foreground italic">{word.meaning}</div>
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
