import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Crimson_Pro, Lexend } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ReadingSettingsProvider } from "@/lib/reading-settings-context"
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

export const metadata: Metadata = {
  title: "Jesus Wept Bible — KJV with Two-Word Insights",
  description:
    "Explore the King James Bible through two critical words per verse, Strong's Concordance, chapter-to-Bible summaries, art Easter eggs, Character Explorer, and dyslexia-friendly reading.",
  generator: "v0.app",
  manifest: "/manifest.json",
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
        <Analytics />
      </body>
    </html>
  )
}
