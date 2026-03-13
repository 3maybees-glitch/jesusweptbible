"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const characterGroups = [
  { name: "Patriarchs", description: "Abraham, Isaac, Jacob, Joseph" },
  { name: "Judges", description: "Deborah, Gideon, Samson, Samuel" },
  { name: "Kings", description: "Saul, David, Solomon, Hezekiah" },
  { name: "Prophets", description: "Isaiah, Jeremiah, Ezekiel, Daniel" },
  { name: "Women of Faith", description: "Sarah, Ruth, Esther, Mary" },
  { name: "Apostles", description: "Peter, John, James, Matthew, Paul" },
  { name: "Early Church", description: "Stephen, Barnabas, Timothy, Titus" },
  { name: "Roman Rulers", description: "Pilate, Herod, Festus, Felix" }
]

const topCharacters = [
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

export default function CharactersPage() {
  return (
    <div className="p-6 space-y-10 max-w-5xl mx-auto">

      <div>
        <h1 className="text-3xl font-bold mb-2">Bible Characters</h1>
        <p className="text-muted-foreground">
          Explore the most significant people of the Bible and their story arcs.
        </p>
      </div>

      {/* Character Groups */}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Browse Character Groups</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {characterGroups.map((group) => (
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

      {/* Top Characters */}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Top Bible Characters</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {topCharacters.map((person) => (
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

      <div className="pt-4">
        <Button className="w-full">
          View All 100 Characters
        </Button>
      </div>

    </div>
  )
}