"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface Bookmark {
  id: string;
  chapterSlug: string;
  chapterTitle: string;
  createdAt: number;
}

export interface Highlight {
  id: string;
  chapterSlug: string;
  chapterTitle: string;
  text: string;
  note: string;
  createdAt: number;
}

interface AnnotationsState {
  bookmarks: Bookmark[];
  highlights: Highlight[];
}

interface AnnotationsContextValue extends AnnotationsState {
  isBookmarked: (chapterSlug: string) => boolean;
  toggleBookmark: (chapterSlug: string, chapterTitle: string) => void;
  addHighlight: (chapterSlug: string, chapterTitle: string, text: string, note?: string) => void;
  updateHighlightNote: (id: string, note: string) => void;
  removeHighlight: (id: string) => void;
  removeBookmark: (id: string) => void;
  highlightsForChapter: (chapterSlug: string) => Highlight[];
}

const STORAGE_KEY = "keyoshi-annotations";

const AnnotationsContext = createContext<AnnotationsContextValue | null>(null);

function loadInitial(): AnnotationsState {
  return { bookmarks: [], highlights: [] };
}

export function AnnotationsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnnotationsState>(loadInitial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const isBookmarked = useCallback(
    (chapterSlug: string) => state.bookmarks.some((b) => b.chapterSlug === chapterSlug),
    [state.bookmarks]
  );

  const toggleBookmark = useCallback((chapterSlug: string, chapterTitle: string) => {
    setState((s) => {
      const exists = s.bookmarks.some((b) => b.chapterSlug === chapterSlug);
      if (exists) {
        return { ...s, bookmarks: s.bookmarks.filter((b) => b.chapterSlug !== chapterSlug) };
      }
      const bookmark: Bookmark = {
        id: crypto.randomUUID(),
        chapterSlug,
        chapterTitle,
        createdAt: Date.now(),
      };
      return { ...s, bookmarks: [bookmark, ...s.bookmarks] };
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setState((s) => ({ ...s, bookmarks: s.bookmarks.filter((b) => b.id !== id) }));
  }, []);

  const addHighlight = useCallback((chapterSlug: string, chapterTitle: string, text: string, note = "") => {
    const highlight: Highlight = {
      id: crypto.randomUUID(),
      chapterSlug,
      chapterTitle,
      text,
      note,
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, highlights: [highlight, ...s.highlights] }));
  }, []);

  const updateHighlightNote = useCallback((id: string, note: string) => {
    setState((s) => ({
      ...s,
      highlights: s.highlights.map((h) => (h.id === id ? { ...h, note } : h)),
    }));
  }, []);

  const removeHighlight = useCallback((id: string) => {
    setState((s) => ({ ...s, highlights: s.highlights.filter((h) => h.id !== id) }));
  }, []);

  const highlightsForChapter = useCallback(
    (chapterSlug: string) => state.highlights.filter((h) => h.chapterSlug === chapterSlug),
    [state.highlights]
  );

  const value: AnnotationsContextValue = {
    ...state,
    isBookmarked,
    toggleBookmark,
    removeBookmark,
    addHighlight,
    updateHighlightNote,
    removeHighlight,
    highlightsForChapter,
  };

  return <AnnotationsContext.Provider value={value}>{children}</AnnotationsContext.Provider>;
}

export function useAnnotations() {
  const ctx = useContext(AnnotationsContext);
  if (!ctx) throw new Error("useAnnotations must be used within AnnotationsProvider");
  return ctx;
}
