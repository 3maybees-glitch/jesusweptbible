"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

function isIosDevice() {
  if (typeof navigator === "undefined") return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false
  const mediaStandalone = window.matchMedia("(display-mode: standalone)").matches
  const iosStandalone = Boolean(
    (navigator as Navigator & { standalone?: boolean }).standalone,
  )
  return mediaStandalone || iosStandalone
}

function isDespiaShell() {
  return typeof window !== "undefined" && (window as Window & { despia?: unknown }).despia !== undefined
}

function AppIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static brand mark for the install CTA
    <img
      src="/icon-192.png"
      alt=""
      width={40}
      height={40}
      className={className}
      aria-hidden="true"
    />
  )
}

/**
 * About-page install guidance for the PWA.
 * Keeps the reading UI clear; only shows actionable install UI when useful.
 */
export function InstallAppSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [inNativeShell, setInNativeShell] = useState(false)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    setInstalled(isStandaloneDisplay())
    setIsIos(isIosDevice())
    setInNativeShell(isDespiaShell())

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      setInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstall)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  if (inNativeShell) return null

  const handleInstall = async () => {
    if (!deferredPrompt) return
    setInstalling(true)
    try {
      await deferredPrompt.prompt()
      await deferredPrompt.userChoice
      setDeferredPrompt(null)
    } finally {
      setInstalling(false)
    }
  }

  return (
    <section className="mb-8">
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="font-serif text-lg font-bold text-foreground mb-3 flex items-center gap-2.5">
          <AppIcon className="h-7 w-7 rounded-md shadow-sm" />
          Install on Your Phone
        </h2>

        {installed ? (
          <p className="text-sm text-muted-foreground leading-relaxed">
            You&apos;re using the installed app. Chapters you open are saved on
            this device for offline reading.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Add Jesus Wept to your home screen for a full-screen reading
              experience without opening a browser tab each time.
            </p>

            {deferredPrompt && (
              <button
                type="button"
                onClick={handleInstall}
                disabled={installing}
                className="mb-4 inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <AppIcon className="h-7 w-7 rounded-[6px] shadow-sm" />
                {installing ? "Opening install…" : "Install Jesus Wept"}
              </button>
            )}

            {isIos && !deferredPrompt && (
              <div className="mb-4 rounded-md border border-border/60 bg-background/40 px-3 py-3">
                <div className="mb-2 flex items-center gap-2.5">
                  <AppIcon className="h-10 w-10 rounded-[9px] shadow-sm" />
                  <p className="text-sm font-semibold text-foreground">
                    On iPhone or iPad
                  </p>
                </div>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>Open this site in Safari</li>
                  <li>Tap the Share button</li>
                  <li>Choose Add to Home Screen</li>
                </ol>
              </div>
            )}

            {!isIos && !deferredPrompt && (
              <div className="mb-3 flex items-start gap-2.5">
                <AppIcon className="mt-0.5 h-9 w-9 shrink-0 rounded-[8px] shadow-sm" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In Chrome or Edge, open the browser menu and choose{" "}
                  <span className="font-semibold text-foreground">Install app</span>{" "}
                  (or Add to Home screen).
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-4 space-y-3 border-t border-border/40 pt-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              What works offline
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chapters you&apos;ve already opened stay available without
              internet, along with your reading marks on this device.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              What still needs internet
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Opening new chapters for the first time, Reflect, and other
              online features need a connection. The full Bible is not
              downloaded all at once.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
