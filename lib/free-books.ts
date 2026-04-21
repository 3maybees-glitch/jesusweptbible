// List of books available for free (case-insensitive matching)
export const FREE_BOOKS = [
  "genesis",
  "psalms", 
  "john"
] as const

export type FreeBook = typeof FREE_BOOKS[number]
