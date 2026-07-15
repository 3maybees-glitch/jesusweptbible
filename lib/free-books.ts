/**
 * Historically free preview books (Genesis, Psalms, John).
 * The full Bible is currently free; this list is retained for Reflect ranking
 * bias and so premium freemium gating can be restored later if needed.
 */
export const FREE_BOOKS = [
  "genesis",
  "psalms",
  "john",
] as const

export type FreeBook = typeof FREE_BOOKS[number]
