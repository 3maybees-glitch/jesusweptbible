"use client"

import { Lock, BookOpen, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpgradeGateProps {
  bookName: string
  onUnlock: () => void
  onBack?: () => void
}

export function UpgradeGate({ bookName, onUnlock, onBack }: UpgradeGateProps) {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-overlay-light pointer-events-none z-0" />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-sm w-full text-center space-y-6">
          {/* Lock Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Lock className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Unlock {bookName}
            </h2>
            <p className="text-muted-foreground">
              This book is part of the full Jesus Wept Bible experience.
            </p>
          </div>

          {/* Price Box */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-serif text-lg font-semibold">Full Bible Access</span>
            </div>
            
            <div className="text-4xl font-bold text-foreground">$1.99</div>
            <p className="text-sm text-muted-foreground">One-time purchase</p>

            {/* Features */}
            <div className="pt-4 border-t border-border space-y-3 text-left">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">All 66 Books</p>
                  <p className="text-xs text-muted-foreground">Complete Old and New Testament</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Two-Word Themes</p>
                  <p className="text-xs text-muted-foreground">Deep insights for every chapter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Unlock Button */}
          <Button 
            onClick={onUnlock} 
            className="w-full py-6 text-lg font-semibold"
            size="lg"
          >
            Unlock Full Bible - $1.99
          </Button>

          {/* Free Books Reminder */}
          <p className="text-xs text-muted-foreground">
            Genesis, Psalms, and John are always free to read.
          </p>

          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Back to Books
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
