"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import CharactersPage from "@/components/characters-page"

export default function CharactersRoute() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Back to Bible"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Bible Characters</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Characters Content */}
      <main className="flex-1 overflow-y-auto pb-4">
        <CharactersPage />
      </main>
    </div>
  )
}
