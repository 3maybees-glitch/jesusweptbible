"use client"

import { X } from "lucide-react"
import { BookTheme } from "@/lib/book-themes"
import { Button } from "@/components/ui/button"

interface ThemeSheetProps {
  theme: BookTheme | null
  isOpen: boolean
  onClose: () => void
}

export function ThemeSheet({ theme, isOpen, onClose }: ThemeSheetProps) {
  if (!isOpen || !theme) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-2xl animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-4 py-4 border-b border-border/20 bg-background/95 backdrop-blur-sm">
          <div>
            <p className="text-sm text-muted-foreground">Book Theme</p>
            <h2 className="text-2xl font-serif font-bold text-foreground">{theme.theme}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Close theme sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Theme Words Display */}
          <div className="space-y-6">
            {theme.words.map((word, index) => (
              <div key={index} className="space-y-3">
                {/* Word and Strong's Number */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-xl font-semibold text-accent">{word.word}</h3>
                  {word.strongNumber && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {word.strongNumber}
                      </span>
                      {word.lemma && (
                        <span className="text-base italic text-accent/70">{word.lemma}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Word Meaning */}
                <p className="text-base leading-relaxed text-foreground/80">{word.meaning}</p>

                {/* Divider */}
                {index < theme.words.length - 1 && (
                  <div className="pt-4 mt-4 border-t border-border/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 px-4 py-4 bg-background/95 backdrop-blur-sm border-t border-border/20">
          <Button onClick={onClose} className="w-full" variant="default">
            Done
          </Button>
        </div>
      </div>
    </>
  )
}
