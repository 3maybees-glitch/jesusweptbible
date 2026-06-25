"use client"

import { useEffect, useState, useCallback } from "react"

const PREMIUM_KEY = "jw_premium"
const PRODUCT_ID = "full_bible_access"

// Generate a unique user ID (persists across sessions)
const getUserId = () => {
  if (typeof window === "undefined") return "web_user"
  
  const stored = localStorage.getItem("despia_user_id")
  if (stored) return stored
  
  const userId = `user_${Math.random().toString(36).slice(2, 11)}`
  localStorage.setItem("despia_user_id", userId)
  return userId
}

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if running in Despia native app
  const isNativeApp = useCallback(() => {
    return typeof window !== "undefined" && 
           (window as any).despia !== undefined
  }, [])

  // Check premium status on mount
  useEffect(() => {
    const checkPremiumStatus = async () => {
      // First check localStorage (for persistence across sessions)
      const stored = localStorage.getItem(PREMIUM_KEY)
      if (stored === "true") {
        setIsPremium(true)
        setIsLoading(false)
        return
      }

      setIsLoading(false)
    }

    checkPremiumStatus()
  }, [])

  // Purchase function - uses Despia URL scheme
  const unlockPremium = useCallback(async () => {
    setError(null)
    setIsPurchasing(true)

    if (isNativeApp()) {
      try {
        const userId = getUserId();
        // Trigger purchase through Despia's URL scheme
        (window as any).despia = `revenuecat://purchase?external_id=${userId}&product=${PRODUCT_ID}`
        
        // Note: Despia will handle the native purchase flow
        // The user needs to set up server-side webhook processing to verify the purchase
        // For now, we'll check after a delay
        setTimeout(() => {
          // In production, this should be verified via server-side webhook
          // For testing, you can manually verify in RevenueCat dashboard
          setIsPurchasing(false)
        }, 2000)
      } catch (err) {
        setError("Purchase failed. Please try again.")
        setIsPurchasing(false)
      }
    } else {
      // Web fallback for testing - simulate purchase
      setTimeout(() => {
        localStorage.setItem(PREMIUM_KEY, "true")
        setIsPremium(true)
        setIsPurchasing(false)
      }, 1000)
    }
  }, [isNativeApp])

  // Restore purchases function - uses Despia URL scheme
  const restorePurchases = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    if (isNativeApp()) {
      try {
        // Trigger restore through Despia's URL scheme
        (window as any).despia = "restoreinapppurchases://"
        
        setTimeout(() => {
          setIsLoading(false)
          // Note: Similar to purchase, this needs server-side verification
        }, 2000)
      } catch (err) {
        setError("Restore failed. Please try again.")
        setIsLoading(false)
      }
    } else {
      // Web fallback
      const stored = localStorage.getItem(PREMIUM_KEY)
      if (stored === "true") {
        setIsPremium(true)
      } else {
        setError("No previous purchase found.")
      }
      setIsLoading(false)
    }
  }, [isNativeApp])

  return {
    isPremium,
    isLoading,
    isPurchasing,
    error,
    unlockPremium,
    restorePurchases,
    isNativeApp: isNativeApp()
  }
}
