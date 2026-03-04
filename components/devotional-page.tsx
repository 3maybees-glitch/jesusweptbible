"use client"

import { ChevronLeft } from "lucide-react"

interface DevotionalPageProps {
  onBack: () => void
}

export function DevotionalPage({ onBack }: DevotionalPageProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-overlay-light/40 via-overlay-light/45 to-overlay-light/50 pointer-events-none z-0" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-overlay-light border-b border-border/20 backdrop-blur-sm">
          <div className="px-4 py-4 flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-serif text-xl text-foreground">The Meaning and Motivation for Bible Reading</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 py-6 pb-12 max-w-2xl mx-auto">
          <section className="space-y-6">
            {/* Opening Scripture */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="font-serif text-lg italic text-foreground mb-2">
                "How can a young man stay pure? By reading your Word..."
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                Psalm 119:9 (TLB)
              </p>
            </div>

            {/* Main Devotional Text */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Many of the difficulties we experience as Christians can be traced to a lack of Bible study and reading. We should not be content to skim through a chapter merely to satisfy our conscience. Hide the Word of God in your heart!
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                A little portion well digested is of greater value to the soul than a lengthy portion scanned hurriedly. Do not be discouraged because you cannot understand it all. Go on reading. As you read, the Holy Spirit will enlighten the passages for you.
              </p>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reading the Bible has a purifying effect upon the heart and mind.
              </p>

              <p className="text-sm text-foreground font-semibold pt-2">
                — Billy Graham Daily Devotionals excerpt
              </p>
            </div>

            {/* Reflection Section */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-serif text-lg font-bold text-foreground mb-3">Reflection</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Today, consider how Bible reading can transform your spiritual life. Rather than rushing through scripture, take time to meditate on what you read. Allow the Holy Spirit to work through the passages, letting even small portions deeply nourish your soul and guide your path toward greater purity and spiritual growth.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
