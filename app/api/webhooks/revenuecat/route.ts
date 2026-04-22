import { NextRequest, NextResponse } from "next/server"

// RevenueCat Webhook Handler
// Documentation: https://www.revenuecat.com/docs/webhooks

// Your RevenueCat webhook authorization header (set this in environment variables)
const REVENUECAT_WEBHOOK_AUTH = process.env.REVENUECAT_WEBHOOK_AUTH || ""

// Event types we care about
type RevenueCatEventType = 
  | "INITIAL_PURCHASE"
  | "RENEWAL"
  | "CANCELLATION"
  | "UNCANCELLATION"
  | "NON_RENEWING_PURCHASE"
  | "SUBSCRIPTION_PAUSED"
  | "EXPIRATION"
  | "BILLING_ISSUE"
  | "PRODUCT_CHANGE"
  | "TRANSFER"

interface RevenueCatEvent {
  type: RevenueCatEventType
  app_user_id: string
  original_app_user_id: string
  product_id: string
  entitlement_ids: string[]
  period_type: string
  purchased_at_ms: number
  expiration_at_ms: number | null
  environment: "SANDBOX" | "PRODUCTION"
  store: "APP_STORE" | "PLAY_STORE" | "STRIPE"
  is_trial_conversion: boolean
  cancel_reason?: string
  price?: number
  currency?: string
  transaction_id?: string
}

interface RevenueCatWebhookPayload {
  api_version: string
  event: RevenueCatEvent
}

export async function POST(request: NextRequest) {
  try {
    // Verify authorization header
    const authHeader = request.headers.get("Authorization")
    
    if (REVENUECAT_WEBHOOK_AUTH && authHeader !== `Bearer ${REVENUECAT_WEBHOOK_AUTH}`) {
      console.error("[RevenueCat Webhook] Invalid authorization header")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const payload: RevenueCatWebhookPayload = await request.json()
    const { event } = payload

    console.log("[RevenueCat Webhook] Received event:", {
      type: event.type,
      app_user_id: event.app_user_id,
      product_id: event.product_id,
      entitlements: event.entitlement_ids,
      environment: event.environment,
      store: event.store,
    })

    // Handle different event types
    switch (event.type) {
      case "INITIAL_PURCHASE":
      case "NON_RENEWING_PURCHASE":
        console.log("[RevenueCat Webhook] New purchase!", {
          user: event.app_user_id,
          product: event.product_id,
          price: event.price,
          currency: event.currency,
          transaction_id: event.transaction_id,
        })
        // User purchased "full_bible_access"
        // Without a database, we log it. With a database, you'd store this.
        break

      case "RENEWAL":
        console.log("[RevenueCat Webhook] Subscription renewed", {
          user: event.app_user_id,
          product: event.product_id,
        })
        break

      case "CANCELLATION":
      case "EXPIRATION":
        console.log("[RevenueCat Webhook] Access revoked", {
          user: event.app_user_id,
          reason: event.cancel_reason,
        })
        break

      case "BILLING_ISSUE":
        console.log("[RevenueCat Webhook] Billing issue", {
          user: event.app_user_id,
        })
        break

      default:
        console.log("[RevenueCat Webhook] Other event:", event.type)
    }

    // Always return 200 to acknowledge receipt
    // RevenueCat will retry if it doesn't get a 200
    return NextResponse.json({ 
      received: true,
      event_type: event.type,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("[RevenueCat Webhook] Error processing webhook:", error)
    
    // Return 200 anyway to prevent infinite retries
    // Log the error for debugging
    return NextResponse.json({ 
      received: true, 
      error: "Processing error logged" 
    })
  }
}

// Handle GET requests (useful for testing the endpoint exists)
export async function GET() {
  return NextResponse.json({ 
    status: "RevenueCat webhook endpoint active",
    timestamp: new Date().toISOString()
  })
}
