"use client"

import { X } from "lucide-react"
import type { VerseArtPainting } from "@/lib/verse-art"

interface ArtGalleryModalProps {
  painting: VerseArtPainting | null
  isOpen: boolean
  onClose: () => void
}

export function ArtGalleryModal({ painting, isOpen, onClose }: ArtGalleryModalProps) {
  if (!isOpen || !painting) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-background border-2 border-accent rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-accent/5 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-accent">{painting.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{painting.reference}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary p-2 rounded-lg"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="relative bg-black rounded-lg overflow-hidden">
            <img
              src={`/art/${painting.painting}`}
              alt={painting.title}
              className="w-full h-auto object-contain max-h-96"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-accent">Artist: </span>
              <span className="text-foreground">{painting.artist}</span>
            </div>

            <div>
              <span className="font-semibold text-accent">Verse: </span>
              <span className="text-foreground">{painting.reference}</span>
            </div>

            <div>
              <span className="font-semibold text-accent block mb-2">Description: </span>
              <p className="text-foreground leading-relaxed">{painting.description}</p>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground italic">
                🎨 This artwork is part of our Easter Egg collection celebrating the visual beauty of Christian artistic traditions throughout history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
