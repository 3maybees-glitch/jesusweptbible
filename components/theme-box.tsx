"use client"

import { BookTheme } from "@/lib/book-themes"

interface ThemeBoxProps {
  theme: BookTheme
  onSelectTheme: (theme: BookTheme) => void
}

export function ThemeBox({ theme, onSelectTheme }: ThemeBoxProps) {
  return (
    <button
      onClick={() => onSelectTheme(theme)}
      className="flex flex-col gap-2 p-4 rounded-lg bg-[#6B2C3E] hover:bg-[#5A1F30] transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 min-h-[80px] shadow-md"
      aria-label={`View theme: ${theme.theme}`}
    >
      <span className="text-sm font-medium text-white/80">Theme</span>
      <span className="text-lg font-semibold text-white">{theme.theme}</span>
    </button>
  )
}
