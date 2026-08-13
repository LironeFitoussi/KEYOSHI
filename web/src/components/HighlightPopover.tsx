"use client";

import { useEffect, useRef, useState } from "react";
import { useAnnotations } from "@/lib/annotations";

interface Selection {
  text: string;
  x: number;
  y: number;
}

export function HighlightPopover({
  containerRef,
  chapterSlug,
  chapterTitle,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  chapterSlug: string;
  chapterTitle: string;
}) {
  const { addHighlight } = useAnnotations();
  const [selection, setSelection] = useState<Selection | null>(null);
  const [noteMode, setNoteMode] = useState(false);
  const [noteText, setNoteText] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        return;
      }
      const text = sel.toString().trim();
      if (!text) return;

      const range = sel.getRangeAt(0);
      const container = containerRef.current;
      if (!container || !container.contains(range.commonAncestorContainer)) return;

      const rect = range.getBoundingClientRect();
      setSelection({
        text,
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY,
      });
      setNoteMode(false);
      setNoteText("");
    }

    function handlePointerDown(e: MouseEvent) {
      if (popoverRef.current?.contains(e.target as Node)) return;
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) return;
      setSelection(null);
    }

    document.addEventListener("mouseup", handleSelectionChange);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mouseup", handleSelectionChange);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [containerRef]);

  if (!selection) return null;

  function saveHighlight(note: string) {
    if (!selection) return;
    addHighlight(chapterSlug, chapterTitle, selection.text, note);
    window.getSelection()?.removeAllRanges();
    setSelection(null);
    setNoteMode(false);
    setNoteText("");
  }

  return (
    <div
      ref={popoverRef}
      style={{ left: selection.x, top: selection.y }}
      className="absolute z-20 -translate-x-1/2 -translate-y-full pb-2"
    >
      {noteMode ? (
        <div className="w-64 rounded-xl border border-border bg-surface p-3 shadow-lg">
          <textarea
            autoFocus
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="הוסיפו הערה..."
            className="h-20 w-full resize-none rounded-lg border border-border bg-background p-2 text-sm text-foreground outline-none"
            dir="rtl"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => saveHighlight(noteText)}
              className="rounded-full bg-accent px-3 py-1 text-xs text-white"
            >
              שמור
            </button>
            <button
              type="button"
              onClick={() => setNoteMode(false)}
              className="rounded-full px-3 py-1 text-xs text-muted hover:text-foreground"
            >
              ביטול
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-1 py-1 text-xs shadow-lg">
          <button
            type="button"
            onClick={() => saveHighlight("")}
            className="rounded-full px-3 py-1.5 text-foreground/80 hover:bg-background hover:text-foreground transition-colors"
          >
            ✎ הדגש
          </button>
          <button
            type="button"
            onClick={() => setNoteMode(true)}
            className="rounded-full px-3 py-1.5 text-foreground/80 hover:bg-background hover:text-foreground transition-colors"
          >
            🗒 הדגש + הערה
          </button>
        </div>
      )}
    </div>
  );
}
