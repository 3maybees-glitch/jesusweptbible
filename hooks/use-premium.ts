"use client"

import { useEffect, useState, useCallback } from "react"

const PREMIUM_KEY = "jw_premium"
const REVENUECAT_API_KEY = "appl_MTXOeDllVOCAKhhDbebkieysBbm"
const PRODUCT_ID = "full_bible_access"
const ENTITLEMENT_ID = "Jesus Wept: The Two-Word Bible Pro"

// Type declarations for Despia's native bridge
declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        revenueCat?: {
          postMessage: (message: string) => void
        }
        despiaIAP?: {
          postMessage: (message: string) => void
        }
      }
    }
    handleRevenueCatResponse?: (response: RevenueCatResponse) => void
    handlePurchaseResponse?: (response: PurchaseResponse) => void
  }
}

interface RevenueCatResponse {
  success: boolean
  isPremium: boolean
  error?: string
}

interface PurchaseResponse {
  success: boolean
  transactionId?: string
  error?: string
}

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if running in Despia native app
  const isNativeApp = useCallback(() => {
    return typeof window !== "undefined" && 
           window.webkit?.messageHandlers?.revenueCat !== undefined
  }, [])

  // Check premium status on mount
  useEffect(() => {
    const checkPremiumStatus = async () => {
      // First check localStorage (for persistence and web testing)
      const stored = localStorage.getItem(PREMIUM_KEY)
      if (stored === "true") {
        setIsPremium(true)
        setIsLoading(false)
        return
      }

      // If in native app, check RevenueCat entitlements
      if (isNativeApp()) {
        // Set up response handler
        window.handleRevenueCatResponse = (response: RevenueCatResponse) => {
          if (response.success && response.isPremium) {
            localStorage.setItem(PREMIUM_KEY, "true")
            setIsPremium(true)
          }
          setIsLoading(false)
        }

        // Request entitlement check from native layer
        window.webkit?.messageHandlers?.revenueCat?.postMessage(
          JSON.stringify({
            action: "checkEntitlements",
            entitlementId: ENTITLEMENT_ID,
            apiKey: REVENUECAT_API_KEY
          })
        )

        // Timeout fallback
        setTimeout(() => {
          if (isLoading) {
            setIsLoading(false)
          }
        }, 5000)
      } else {
        // Web fallback - just use localStorage
        setIsLoading(false)
      }
    }

    checkPremiumStatus()
  }, [isNativeApp, isLoading])

  // Purchase function
  const unlockPremium = useCallback(async () => {
    setError(null)
    setIsPurchasing(true)

    if (isNativeApp()) {
      // Set up purchase response handler
      window.handlePurchaseResponse = (response: PurchaseResponse) => {
        setIsPurchasing(false)
        if (response.success) {
          localStorage.setItem(PREMIUM_KEY, "true")
          setIsPremium(true)
        } else {
          setError(response.error || "Purchase failed. Please try again.")
        }
      }

      // Trigger purchase through native layer
      window.webkit?.messageHandlers?.revenueCat?.postMessage(
        JSON.stringify({
          action: "purchase",
          productId: PRODUCT_ID,
          apiKey: REVENUECAT_API_KEY
        })
      )

      // Timeout fallback
      setTimeout(() => {
        if (isPurchasing) {
          setIsPurchasing(false)
          setError("Purchase timed out. Please try again.")
        }
      }, 60000) // 60 second timeout for purchase
    } else {
      // Web fallback for testing - simulate purchase
      setTimeout(() => {
        localStorage.setItem(PREMIUM_KEY, "true")
        setIsPremium(true)
        setIsPurchasing(false)
      }, 1000)
    }
  }, [isNativeApp, isPurchasing])

  // Restore purchases function
  const restorePurchases = useCallback(async () => {
    setError(null)
    setIsLoading(true)

    if (isNativeApp()) {
      window.handleRevenueCatResponse = (response: RevenueCatResponse) => {
        setIsLoading(false)
        if (response.success && response.isPremium) {
          localStorage.setItem(PREMIUM_KEY, "true")
          setIsPremium(true)
        } else if (!response.success) {
          setError(response.error || "No purchases to restore.")
        } else {
          setError("No previous purchase found.")
        }
      }

      window.webkit?.messageHandlers?.revenueCat?.postMessage(
        JSON.stringify({
          action: "restorePurchases",
          entitlementId: ENTITLEMENT_ID,
          apiKey: REVENUECAT_API_KEY
        })
      )

      setTimeout(() => {
        if (isLoading) {
          setIsLoading(false)
          setError("Restore timed out. Please try again.")
        }
      }, 30000)
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
  }, [isNativeApp, isLoading])

  // Reset for testing (remove in production)
  const resetPremium = useCallback(() => {
    localStorage.removeItem(PREMIUM_KEY)
    setIsPremium(false)
    setError(null)
  }, [])

  return {
    isPremium,
    isLoading,
    isPurchasing,
    error,
    unlockPremium,
    restorePurchases,
    resetPremium,
    isNativeApp: isNativeApp()
  }
}
