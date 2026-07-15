import { FREE_BOOKS } from "./free-books"

/**
 * Check if a book is unlocked for the user.
 *
 * The full Bible is currently free (no paywall). Premium gating can be
 * re-enabled later by restoring freemium checks against FREE_BOOKS / isPremium.
 */
export function isBookUnlocked(_bookName: string, _isPremium?: boolean): boolean {
  return true
}

/**
 * Check if a book is one of the historically free preview books.
 * Kept for ranking / analytics; all books are unlocked in the app.
 */
export function isFreeBook(bookName: string): boolean {
  const normalizedBook = bookName.toLowerCase()
  return FREE_BOOKS.includes(normalizedBook as (typeof FREE_BOOKS)[number])
}
