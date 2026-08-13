"use client";

import Link from "next/link";
import { useReaderSettings, FONT_LABELS, type FontChoice } from "@/lib/reader-settings";
import { useAnnotations } from "@/lib/annotations";

const FONT_OPTIONS: FontChoice[] = ["frank-ruhl", "heebo", "noto-sans"];
const MIN_SIZE = 15;
const MAX_SIZE = 28;

export function ReaderToolbar({
  chapterSlug,
  chapterTitle,
}: {
  chapterSlug?: string;
  chapterTitle?: string;
}) {
  const { theme, setTheme, font, setFont, fontSize, setFontSize } = useReaderSettings();
  const { isBookmarked, toggleBookmark } = useAnnotations();

  const bookmarked = chapterSlug ? isBookmarked(chapterSlug) : false;

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-1 py-1">
        <button
          type="button"
          aria-label="הקטן גופן"
          onClick={() => setFontSize(Math.max(MIN_SIZE, fontSize - 1))}
          className="h-7 w-7 rounded-full text-foreground/70 hover:bg-background hover:text-foreground transition-colors"
        >
          א−
        </button>
        <span className="w-6 text-center text-xs text-muted">{fontSize}</span>
        <button
          type="button"
          aria-label="הגדל גופן"
          onClick={() => setFontSize(Math.min(MAX_SIZE, fontSize + 1))}
          className="h-7 w-7 rounded-full text-foreground/70 hover:bg-background hover:text-foreground transition-colors"
        >
          א+
        </button>
      </div>

      <select
        aria-label="בחר גופן"
        value={font}
        onChange={(e) => setFont(e.target.value as FontChoice)}
        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground/80 outline-none"
      >
        {FONT_OPTIONS.map((f) => (
          <option key={f} value={f}>
            {FONT_LABELS[f]}
          </option>
        ))}
      </select>

      {chapterSlug && chapterTitle && (
        <button
          type="button"
          aria-label={bookmarked ? "הסר סימניה" : "הוסף סימניה"}
          onClick={() => toggleBookmark(chapterSlug, chapterTitle)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface transition-colors ${
            bookmarked ? "text-accent" : "text-foreground/80 hover:text-foreground"
          }`}
        >
          {bookmarked ? "★" : "☆"}
        </button>
      )}

      <Link
        href="/library"
        aria-label="הספרייה שלי"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground/80 hover:text-foreground transition-colors"
      >
        📑
      </Link>

      <button
        type="button"
        aria-label="החלף מצב תצוגה"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-foreground/80 hover:text-foreground transition-colors"
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
    </div>
  );
}
