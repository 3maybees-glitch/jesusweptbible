"use client"

import { useEffect, useState } from "react"

const PREMIUM_KEY = "jw_premium"

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for premium status
    const stored = localStorage.getItem(PREMIUM_KEY)
    if (stored === "true") {
      setIsPremium(true)
    }
    setIsLoading(false)
  }, [])

  const unlockPremium = () => {
    // In production, this would be called after successful IAP
    localStorage.setItem(PREMIUM_KEY, "true")
    setIsPremium(true)
  }

  const resetPremium = () => {
    // For testing purposes - remove in production
    localStorage.removeItem(PREMIUM_KEY)
    setIsPremium(false)
  }

  return {
    isPremium,
    isLoading,
    unlockPremium,
    resetPremium
  }
}
