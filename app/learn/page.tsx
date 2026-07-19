import type { Metadata } from "next"
import { LearnPage } from "@/components/learn-page"

export const metadata: Metadata = {
  title: "How Jesus Wept Bible Works — Learn & Explore",
  description:
    "Discover how Jesus Wept Bible highlights two critical words in every verse, Strong's Concordance meanings, two-word summaries, unique landscapes for all 66 books, purple-cross art Easter eggs, Character Explorer, Reflect counsel and encouragement, and dyslexia-friendly reading.",
}

export default function LearnRoute() {
  return <LearnPage />
}
