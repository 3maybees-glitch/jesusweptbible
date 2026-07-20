"use client"

import { useEffect } from "react"

/**
 * Registers the Serwist service worker for browser installs.
 * Skips Despia native shells where a SW can fight the wrapper.
 */
export function RegisterPwa() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (process.env.NODE_ENV === "development") return
    if (!("serviceWorker" in navigator)) return
    if ((window as Window & { despia?: unknown }).despia !== undefined) return

    const register = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        })
      } catch {
        // Service worker registration is best-effort.
      }
    }

    void register()
  }, [])

  return null
}
