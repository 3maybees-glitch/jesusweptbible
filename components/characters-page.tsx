"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CharacterGroup {
  name: string
  description?: string
}

interface TopCharacter {
  name: string
  theme: string
  ref: string
}

interface CharactersData {
  characterGroups: CharacterGroup[]
  topCharacters: TopCharacter[]
}

// Fallback data if JSON fails to load
const fallbackData: CharactersData = {
  characterGroups: [
    { name: "Patriarchs", description: "Abraham, Isaac, Jacob, Joseph" },
    { name: "Judges", description: "Deborah, Gideon, Samson, Samuel" },
    { name: "Kings", description: "Saul, David, Solomon, Hezekiah" },
    { name: "Prophets", description: "Isaiah, Jeremiah, Ezekiel, Daniel" },
    { name: "Women of Faith", description: "Sarah, Ruth, Esther, Mary" },
    { name: "Apostles", description: "Peter, John, James, Matthew, Paul" },
    { name: "Early Church", description: "Stephen, Barnabas, Timothy, Titus" },
    { name: "Roman Rulers", description: "Pilate, Herod, Festus, Felix" }
  ],
  topCharacters: [
    { name: "Adam", theme: "First Man", ref: "Genesis 1–5" },
    { name: "Noah", theme: "Ark Builder", ref: "Genesis 5–10" },
    { name: "Abraham", theme: "Covenant Father", ref: "Genesis 11–25" },
    { name: "Moses", theme: "Law Giver", ref: "Exodus–Deuteronomy" },
    { name: "David", theme: "Shepherd King", ref: "1 Samuel 16 – 1 Kings 2" },
    { name: "Solomon", theme: "Wise King", ref: "1 Kings 1–11" },
    { name: "Elijah", theme: "Fire Prophet", ref: "1 Kings 17 – 2 Kings 2" },
    { name: "Isaiah", theme: "Messianic Prophet", ref: "Isaiah 1–66" },
    { name: "Mary", theme: "Messiah Mother", ref: "Matthew 1 – Acts 1" },
    { name: "Peter", theme: "Apostle Leader", ref: "Matthew – Acts" },
    { name: "Paul", theme: "Gentile Apostle", ref: "Acts – 2 Timothy" },
    { name: "John", theme: "Beloved Apostle", ref: "John – Revelation" }
  ]
}

export default function CharactersPage() {
  const [data, setData] = useState<CharactersData>(fallbackData)
  const [loading, setLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<TopCharacter | null>(null)

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch("/data/bible-characters.json")
        if (response.ok) {
          const jsonData = await response.json() as CharactersData
          setData(jsonData)
          console.log("[v0] Characters loaded from JSON:", jsonData)
        } else {
          console.log("[v0] JSON file not found, using fallback data")
          setData(fallbackData)
        }
      } catch (err) {
        console.log("[v0] Could not load JSON file, using fallback data:", err)
        setData(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [])

  if (loading) {
    return (
      <div className="p-6 space-y-10 max-w-5xl mx-auto">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading Bible characters...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bible Characters</h1>
        <p className="text-muted-foreground">
          Explore the most significant people of the Bible and their story arcs.
        </p>
      </div>

      {/* Character Groups */}
      {data.characterGroups && data.characterGroups.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Browse Character Groups</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.characterGroups.map((group) => (
              <button
                key={group.name}
                onClick={() => setSelectedGroup(selectedGroup === group.name ? null : group.name)}
                className="text-left"
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedGroup === group.name
                      ? "ring-2 ring-accent shadow-lg bg-accent/5"
                      : "hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                    {selectedGroup === group.name && (
                      <p className="text-xs text-accent font-medium mt-3">
                        ✓ Selected
                      </p>
                    )}
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top Characters */}
      {data.topCharacters && data.topCharacters.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Top Bible Characters</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.topCharacters.map((person) => (
              <button
                key={person.name}
                onClick={() => setSelectedCharacter(
                  selectedCharacter?.name === person.name ? null : person
                )}
                className="text-left"
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedCharacter?.name === person.name
                      ? "ring-2 ring-accent shadow-lg bg-accent/5"
                      : "hover:shadow-lg"
                  }`}
                >
                  <CardContent className="p-5 space-y-1">
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {person.theme}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {person.ref}
                    </p>
                    {selectedCharacter?.name === person.name && (
                      <p className="text-xs text-accent font-medium mt-2">
                        ✓ Selected
                      </p>
                    )}
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Character Details */}
      {selectedCharacter && (
        <Card className="bg-accent/10 border-accent/50">
          <CardContent className="p-6 space-y-3">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {selectedCharacter.name}
              </h3>
              <p className="text-lg text-accent font-semibold">
                {selectedCharacter.theme}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Scripture: {selectedCharacter.ref}
              </p>
            </div>
            <button
              onClick={() => setSelectedCharacter(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕ Close details
            </button>
          </CardContent>
        </Card>
      )}

      <div className="pt-4">
        <Button className="w-full">
          View All {data.characterGroups?.length ?? 8} Character Groups
        </Button>
      </div>
    </div>
  )
}
