"use client"

import { Settings, X, Type, Palette, BookOpen } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { useReadingSettings, type FontSize, type ReadingTheme } from "@/lib/reading-settings-context"

interface ReadingSettingsSheetProps {
  isOpen: boolean
  onClose: () => void
}

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
  { value: "xlarge", label: "XL" },
]

const READING_THEMES: { value: ReadingTheme; label: string; bg: string; text: string; border: string }[] = [
  { value: "default", label: "Default", bg: "bg-white", text: "text-gray-900", border: "border-gray-300" },
  { value: "sepia", label: "Sepia", bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-300" },
  { value: "dark", label: "Dark", bg: "bg-gray-900", text: "text-gray-100", border: "border-gray-600" },
]

export function ReadingSettingsSheet({ isOpen, onClose }: ReadingSettingsSheetProps) {
  const { settings, setDyslexiaMode, setFontSize, setReadingTheme } = useReadingSettings()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Reading Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 pb-8 pt-2">

          {/* Dyslexia Mode */}
          <section>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground text-base">Dyslexia Mode</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Adjusts font, spacing, and colors to make Scripture easier to read for many dyslexic readers.
                </p>
              </div>
              <Switch
                checked={settings.dyslexiaMode}
                onCheckedChange={setDyslexiaMode}
                aria-label="Toggle dyslexia mode"
                className="mt-1 flex-shrink-0"
              />
            </div>

            {/* Preview strip */}
            <div
              className={`mt-3 rounded-lg px-4 py-3 border transition-all duration-300 ${
                settings.dyslexiaMode
                  ? "bg-amber-50 border-amber-200"
                  : "bg-background border-border"
              }`}
            >
              <p
                className={`transition-all duration-300 ${
                  settings.dyslexiaMode
                    ? "text-base leading-loose tracking-wide text-gray-800"
                    : "text-sm leading-normal text-foreground"
                }`}
                style={settings.dyslexiaMode ? { fontFamily: "'Lexend', 'Arial', sans-serif", wordSpacing: "0.1em" } : {}}
              >
                <span className="text-xs text-muted-foreground mr-2 font-normal">35</span>
                Jesus wept.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {settings.dyslexiaMode ? "Dyslexia mode on" : "Default reading style"}
              </p>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Font Size */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Type className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground text-base">Font Size</h3>
            </div>
            <div className="flex gap-2">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setFontSize(size.value)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all min-h-[48px] ${
                    settings.fontSize === size.value
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background text-foreground border-border hover:bg-secondary"
                  }`}
                  aria-label={`Font size ${size.label}`}
                  aria-pressed={settings.fontSize === size.value}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Reading Theme */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground text-base">Theme</h3>
            </div>
            <div className="flex gap-2">
              {READING_THEMES.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setReadingTheme(theme.value)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all min-h-[48px] ${theme.bg} ${theme.text} ${
                    settings.readingTheme === theme.value
                      ? `${theme.border} ring-2 ring-offset-1 ring-foreground/30`
                      : `${theme.border} opacity-70 hover:opacity-100`
                  }`}
                  aria-label={`${theme.label} theme`}
                  aria-pressed={settings.readingTheme === theme.value}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </section>

        </div>
      </SheetContent>
    </Sheet>
  )
}
