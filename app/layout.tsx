import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Crimson_Pro, Lexend } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReadingSettingsProvider } from "@/lib/reading-settings-context"
import { RegisterPwa } from "@/components/register-pwa"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
})
const _lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lexend",
})

const APP_NAME = "Jesus Wept"
const APP_DEFAULT_TITLE = "Jesus Wept Bible — KJV with Two-Word Insights"
const APP_DESCRIPTION =
  "Explore the King James Bible through two critical words per verse, Strong's Concordance, chapter-to-Bible summaries, art Easter eggs, Character Explorer, and dyslexia-friendly reading."

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: `%s — ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f0e8",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${_lexend.variable}`}>
      <body className={`font-sans antialiased`}>
        <ReadingSettingsProvider>
          {children}
        </ReadingSettingsProvider>
        <RegisterPwa />
        <Analytics />
      </body>
    </html>
  )
}
