"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type FontChoice = "heebo" | "frank-ruhl" | "noto-sans";
export type Theme = "light" | "dark";

interface ReaderSettings {
  theme: Theme;
  font: FontChoice;
  fontSize: number;
}

interface ReaderSettingsContextValue extends ReaderSettings {
  setTheme: (theme: Theme) => void;
  setFont: (font: FontChoice) => void;
  setFontSize: (size: number) => void;
}

const DEFAULTS: ReaderSettings = {
  theme: "light",
  font: "frank-ruhl",
  fontSize: 19,
};

const STORAGE_KEY = "keyoshi-reader-settings";

const ReaderSettingsContext = createContext<ReaderSettingsContextValue | null>(null);

export const FONT_CLASS: Record<FontChoice, string> = {
  heebo: "font-heebo",
  "frank-ruhl": "font-frank-ruhl",
  "noto-sans": "font-noto-sans-hebrew",
};

export const FONT_LABELS: Record<FontChoice, string> = {
  "frank-ruhl": "פרנק רוהל (סריף)",
  heebo: "היבו (סאנס)",
  "noto-sans": "נוטו סאנס",
};

export function ReaderSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.theme;
  }, [settings, hydrated]);

  const value: ReaderSettingsContextValue = {
    ...settings,
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setFont: (font) => setSettings((s) => ({ ...s, font })),
    setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
  };

  return <ReaderSettingsContext.Provider value={value}>{children}</ReaderSettingsContext.Provider>;
}

export function useReaderSettings() {
  const ctx = useContext(ReaderSettingsContext);
  if (!ctx) throw new Error("useReaderSettings must be used within ReaderSettingsProvider");
  return ctx;
}
