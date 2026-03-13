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

export default function CharactersPage() {
  const [data, setData] = useState<CharactersData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const response = await fetch("/data/bible-characters.json")
        if (!response.ok) {
          throw new Error("Failed to load characters data")
        }
        const jsonData = await response.json() as CharactersData
        setData(jsonData)
        console.log("[v0] Characters loaded:", jsonData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("[v0] Error loading characters:", err)
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

  if (error || !data) {
    return (
      <div className="p-6 space-y-10 max-w-5xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-500">Error loading characters: {error}</p>
          <p className="text-sm text-muted-foreground mt-2">Make sure bible-characters.json is in /public/data/</p>
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
              <Card key={group.name} className="cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {group.description}
                  </p>
                </CardContent>
              </Card>
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
              <Card key={person.name} className="hover:shadow-lg transition">
                <CardContent className="p-5 space-y-1">
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {person.theme}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {person.ref}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <Button className="w-full">
          View All {data.characterGroups?.length ?? 0} Character Groups
        </Button>
      </div>
    </div>
  )
}
