"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface NameEtymology {
  language: string
  original: string
  lemma: string
  meaning: string
}

interface Character {
  name: string
  theme?: string
  ref?: string
  nameEtymology?: NameEtymology
  highlightedWords?: Array<{
    word: string
    strongNumber?: string
    lemma?: string
    meaning?: string
  }>
}

interface CharactersData {
  characterGroups?: Array<{ name: string; description?: string }>
  topCharacters?: Character[]
  allCharacters?: Character[]
}

// Sample data with enhanced structure
const sampleCharacters: Character[] = [
  {
    name: "Adam",
    theme: "First Man",
    ref: "Genesis 1-5",
    nameEtymology: {
      language: "Hebrew",
      original: "אָדָם",
      lemma: "adam",
      meaning: "Man, mankind; from the red earth from which he was formed"
    }
  },
  {
    name: "Noah",
    theme: "Ark Builder",
    ref: "Genesis 5-10",
    nameEtymology: {
      language: "Hebrew",
      original: "נֹחַ",
      lemma: "noah",
      meaning: "Rest, comfort; he shall comfort us concerning the work of our hands"
    }
  },
  {
    name: "Abraham",
    theme: "Covenant Father",
    ref: "Genesis 11-25",
    nameEtymology: {
      language: "Hebrew",
      original: "אַבְרָהָם",
      lemma: "abraham",
      meaning: "Father of multitudes; exalted father"
    }
  },
  {
    name: "Isaac",
    theme: "Son of Promise",
    ref: "Genesis 21-35",
    nameEtymology: {
      language: "Hebrew",
      original: "יִצְחָק",
      lemma: "yitschaq",
      meaning: "He laughs; laughter; joy and delight"
    }
  },
  {
    name: "Jacob",
    theme: "Israel",
    ref: "Genesis 25-50",
    nameEtymology: {
      language: "Hebrew",
      original: "יַעֲקֹב",
      lemma: "ya'akov",
      meaning: "Supplanter, heel-holder; one who takes the place of another"
    }
  },
  {
    name: "Joseph",
    theme: "Dreamer",
    ref: "Genesis 37-50",
    nameEtymology: {
      language: "Hebrew",
      original: "יוֹסֵף",
      lemma: "yosef",
      meaning: "He shall add; the LORD will add to us another son"
    }
  },
  {
    name: "Moses",
    theme: "Law Giver",
    ref: "Exodus - Deuteronomy",
    nameEtymology: {
      language: "Hebrew",
      original: "מֹשֶׁה",
      lemma: "mosheh",
      meaning: "Drawn out; taken from the water"
    }
  },
  {
    name: "David",
    theme: "Shepherd King",
    ref: "1 Samuel 16 - 1 Kings 2",
    nameEtymology: {
      language: "Hebrew",
      original: "דָּוִד",
      lemma: "dawid",
      meaning: "Beloved; beloved of the LORD"
    }
  },
  {
    name: "Solomon",
    theme: "Wise King",
    ref: "1 Kings 1-11",
    nameEtymology: {
      language: "Hebrew",
      original: "שְׁלֹמֹה",
      lemma: "shlomoh",
      meaning: "Peaceful; his peace; from shalom meaning peace and wholeness"
    }
  },
  {
    name: "Elijah",
    theme: "Fire Prophet",
    ref: "1 Kings 17 - 2 Kings 2",
    nameEtymology: {
      language: "Hebrew",
      original: "אֵלִיָּהוּ",
      lemma: "eliyahu",
      meaning: "My God is Yahweh; God is strong"
    }
  }
]

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>(sampleCharacters)
  const [loading, setLoading] = useState(true)
  const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch("/data/bible-characters.json")
        if (response.ok) {
          const jsonData = await response.json() as CharactersData
          const allChars = jsonData.allCharacters || jsonData.topCharacters || sampleCharacters
          setCharacters(allChars)
          console.log("[v0] Loaded", allChars.length, "characters from JSON")
        } else {
          setCharacters(sampleCharacters)
        }
      } catch (err) {
        console.log("[v0] Using sample characters")
        setCharacters(sampleCharacters)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  const filteredCharacters = characters.filter(char =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading Bible characters...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bible Characters</h1>
        <p className="text-muted-foreground">
          Explore {characters.length} significant people from Scripture. Click any name to view Hebrew/Greek etymology and meaning.
        </p>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Characters List */}
      <div className="space-y-2">
        {filteredCharacters.map((character) => (
          <div key={character.name}>
            <button
              onClick={() => {
                console.log("[v0] Clicked character:", character.name)
                setExpandedCharacter(
                  expandedCharacter === character.name ? null : character.name
                )
              }}
              className="w-full text-left"
            >
              <Card className="cursor-pointer transition-all hover:shadow-md hover:border-accent/50">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{character.name}</h3>
                    <p className="text-sm text-muted-foreground">{character.theme}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    <span className="text-xs text-muted-foreground">{character.ref}</span>
                    {expandedCharacter === character.name ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </button>

            {/* Expanded Details */}
            {expandedCharacter === character.name && character.nameEtymology && (
              <Card className="mt-2 bg-accent/5 border-accent/30">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-semibold text-foreground">
                        {character.nameEtymology.original}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {character.nameEtymology.language}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">Lemma: </span>
                        <span className="font-mono text-foreground">
                          {character.nameEtymology.lemma}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Meaning: </span>
                        <span className="text-foreground">
                          {character.nameEtymology.meaning}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Highlighted Words */}
                  {character.highlightedWords && character.highlightedWords.length > 0 && (
                    <div className="pt-3 border-t border-accent/20 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Key Terms
                      </p>
                      {character.highlightedWords.map((word, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="flex gap-2 items-start">
                            <span className="font-medium text-foreground">{word.word}</span>
                            {word.strongNumber && (
                              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-mono">
                                {word.strongNumber}
                              </span>
                            )}
                          </div>
                          {word.meaning && (
                            <p className="text-xs text-muted-foreground ml-0 mt-1">
                              {word.meaning}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No characters found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  )
}
