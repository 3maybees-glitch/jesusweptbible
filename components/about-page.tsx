"use client"

import { ChevronLeft, Book } from "lucide-react"

interface AboutPageProps {
  onBack: () => void
}

export function AboutPage({ onBack }: AboutPageProps) {
  const bookDescriptions = [
    { name: "Matthew", desc: "Dark mountainous landscape of ancient Roman Palestine with sunset golden hour, dramatic stormy sky, moody atmospheric high contrast" },
    { name: "Mark", desc: "Dark dramatic seascape of Galilee with storm clouds, rough waters, Palestinian coast, deep shadows, cinematic mood" },
    { name: "Luke", desc: "Dark lush Mediterranean garden landscape with olive groves, ancient Roman paths, warm amber light, mysterious mood" },
    { name: "John", desc: "Dark celestial night sky with stars and cosmos, deep universe, spiritual ethereal landscape, mystical atmosphere" },
    { name: "Acts", desc: "Dark ancient Roman city landscape of Jerusalem and early Christian cities with dramatic architecture, glowing fires, dynamic energy" },
    { name: "Romans", desc: "Dark ancient Rome landscape with Colosseum and forum at dusk, powerful architecture, deep shadows, contemplative mood" },
    { name: "1 Corinthians", desc: "Dark cosmopolitan city landscape of ancient Corinth with marketplace ruins, golden sunset, warm glowing light" },
    { name: "2 Corinthians", desc: "Dark stormy seascape with rough seas, dramatic clouds, coastal cliffs, moody atmospheric lighting" },
    { name: "Galatians", desc: "Dark mountainous landscape of ancient Anatolia with rolling hills, deep forests, golden hour light through mist" },
    { name: "Ephesians", desc: "Dark ethereal landscape with glowing city lights, celestial sky, spiritual mystical atmosphere, golden radiance" },
    { name: "Philippians", desc: "Dark joyful garden landscape with flowers and light, warm golden hour, peaceful serene atmosphere, gentle beauty" },
    { name: "Colossians", desc: "Dark rich earth tones landscape with ancient mystery, deep forests, mystical atmosphere, glowing warmth" },
    { name: "1 Thessalonians", desc: "Dark night sky with stars and constellations, hope and light in darkness, glowing horizon, peaceful twilight" },
    { name: "2 Thessalonians", desc: "Dark apocalyptic landscape with dramatic sky, divine light breaking through clouds, powerful spiritual energy" },
    { name: "1 Timothy", desc: "Dark spiritual mountain landscape with sacred temple architecture, glowing light, reverent peaceful atmosphere" },
    { name: "2 Timothy", desc: "Dark prison landscape of ancient Rome dungeon with single light source, shadows and hope, dramatic lighting" },
    { name: "Titus", desc: "Dark island landscape of Mediterranean with ancient Greek ruins, golden sunset, warm glowing light over water" },
    { name: "Philemon", desc: "Dark intimate house landscape with ancient Roman home architecture, warm candlelight, personal spiritual space" },
    { name: "Hebrews", desc: "Dark temple landscape with heavenly architecture, divine light rays, golden sacred atmosphere, spiritual majesty" },
    { name: "James", desc: "Dark practical landscape with work and craftsmanship, fields and vineyards, earth tones, honest natural light" },
    { name: "1 Peter", desc: "Dark suffering landscape with rocky coastline, storms and perseverance, dramatic moody atmosphere, glowing hope" },
    { name: "2 Peter", desc: "Dark apocalyptic sky with end times vision, divine judgment, powerful celestial light, mystical atmosphere" },
    { name: "1 John", desc: "Close-up field of colorful flowers glowing with golden sunrise light, petals illuminated from behind with warm amber rays, blooming wildflowers in purples, pinks, yellows and whites, morning dew, ethereal glowing atmosphere, dreamy romantic lighting" },
    { name: "2 John", desc: "Dark truth landscape with bright light piercing darkness, clarity and vision, golden illumination" },
    { name: "3 John", desc: "Dark journey landscape with paths and roads, pilgrimage, golden sunset light, warm welcoming glow" },
    { name: "Jude", desc: "Dark cosmic landscape with stars and universe, divine judgment sky, powerful spiritual energy, mysterious sublime" },
    { name: "Revelation", desc: "Dark apocalyptic vision landscape with throne room of God, divine light and fire, mystical celestial atmosphere, epic spiritual drama" },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-3 min-h-[44px] px-2 -mx-2"
              aria-label="Back to books menu"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="font-serif text-2xl text-foreground text-center">
              About This App
            </h1>
            <p className="text-sm text-muted-foreground text-center mt-1">New Testament - King James Version</p>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 pb-12 max-w-2xl mx-auto">
          <section className="mb-8">
            <h2 className="font-serif text-lg text-foreground mb-3">Overview</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Bible app presents all 27 books of the New Testament in the King James Version with thoughtfully designed, thematic landscape backgrounds for each book. Each background complements the spiritual themes and content of its respective book.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
              <Book className="w-5 h-5 opacity-70" />
              Book Wallpaper Descriptions
            </h2>
            <div className="space-y-4">
              {bookDescriptions.map((book) => (
                <div key={book.name} className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-serif font-semibold text-foreground mb-1.5">{book.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{book.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              Each background is designed with a 60% dark overlay to ensure text readability while maintaining the beauty of the landscape imagery.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
