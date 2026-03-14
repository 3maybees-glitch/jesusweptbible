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
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border border-accent/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-start justify-between p-6 border-b border-accent/20 bg-gradient-to-r from-accent/10 to-accent/5">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-accent font-serif">{painting.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{painting.reference}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
              aria-label="Close art gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Image */}
            <div className="relative bg-black/50 rounded-lg overflow-hidden border border-accent/20">
              <img
                src={`/art/${painting.painting}`}
                alt={painting.title}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Details Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Artist</p>
                  <p className="text-foreground font-medium">{painting.artist}</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Bible Verse</p>
                  <p className="text-foreground font-medium">{painting.reference}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card/50 rounded-lg p-5 border border-border/50">
                <p className="text-sm text-foreground leading-relaxed">{painting.description}</p>
              </div>

              {/* Easter Egg Message */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-sm text-purple-300 italic">
                  You found an Easter Egg! Discover more hidden artworks by exploring the Bible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
