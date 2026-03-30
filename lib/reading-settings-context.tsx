"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type FontSize = "small" | "medium" | "large" | "xlarge"
export type ReadingTheme = "default" | "sepia" | "dark"

export interface ReadingSettings {
  dyslexiaMode: boolean
  fontSize: FontSize
  readingTheme: ReadingTheme
}

interface ReadingSettingsContextValue {
  settings: ReadingSettings
  setDyslexiaMode: (value: boolean) => void
  setFontSize: (value: FontSize) => void
  setReadingTheme: (value: ReadingTheme) => void
}

const defaultSettings: ReadingSettings = {
  dyslexiaMode: false,
  fontSize: "medium",
  readingTheme: "default",
}

const ReadingSettingsContext = createContext<ReadingSettingsContextValue>({
  settings: defaultSettings,
  setDyslexiaMode: () => {},
  setFontSize: () => {},
  setReadingTheme: () => {},
})

export function ReadingSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReadingSettings>(defaultSettings)

  const setDyslexiaMode = (value: boolean) =>
    setSettings((prev) => ({ ...prev, dyslexiaMode: value }))

  const setFontSize = (value: FontSize) =>
    setSettings((prev) => ({ ...prev, fontSize: value }))

  const setReadingTheme = (value: ReadingTheme) =>
    setSettings((prev) => ({ ...prev, readingTheme: value }))

  return (
    <ReadingSettingsContext.Provider value={{ settings, setDyslexiaMode, setFontSize, setReadingTheme }}>
      {children}
    </ReadingSettingsContext.Provider>
  )
}

export function useReadingSettings() {
  return useContext(ReadingSettingsContext)
}
