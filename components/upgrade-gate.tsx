"use client"

/**
 * Upgrade / paywall UI retained for optional premium features later.
 * The full Bible is currently free; this component is not rendered.
 */
import { Lock, BookOpen, Sparkles, Loader2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UpgradeGateProps {
  bookName: string
  onUnlock: () => void
  onRestore?: () => void
  onBack?: () => void
  isPurchasing?: boolean
  isRestoring?: boolean
  error?: string | null
}

export function UpgradeGate({ 
  bookName, 
  onUnlock, 
  onRestore,
  onBack, 
  isPurchasing = false,
  isRestoring = false,
  error 
}: UpgradeGateProps) {
  const isLoading = isPurchasing || isRestoring

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

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Unlock Button */}
          <Button 
            onClick={onUnlock} 
            className="w-full py-6 text-lg font-semibold"
            size="lg"
            disabled={isLoading}
          >
            {isPurchasing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Unlock Full Bible - $1.99"
            )}
          </Button>

          {/* Restore Purchases Button */}
          {onRestore && (
            <Button
              onClick={onRestore}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isRestoring ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore Purchases
                </>
              )}
            </Button>
          )}

          {/* Free Books Reminder */}
          <p className="text-xs text-muted-foreground">
            Genesis, Psalms, and John are always free to read.
          </p>

          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
              disabled={isLoading}
            >
              Back to Books
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
