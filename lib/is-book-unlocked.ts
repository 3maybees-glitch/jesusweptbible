import { FREE_BOOKS } from "./free-books"

/**
 * Check if a book is unlocked for the user
 * Free books: Genesis, Psalms, John
 * All other books require premium ($1.99 purchase)
 */
export function isBookUnlocked(bookName: string, isPremium: boolean): boolean {
  // Premium users have access to everything
  if (isPremium) return true
  
  // Check if book is in the free list (case-insensitive)
  const normalizedBook = bookName.toLowerCase()
  return FREE_BOOKS.includes(normalizedBook as any)
}

/**
 * Check if a book is one of the free books
 */
export function isFreeBook(bookName: string): boolean {
  const normalizedBook = bookName.toLowerCase()
  return FREE_BOOKS.includes(normalizedBook as any)
}
