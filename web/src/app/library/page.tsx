"use client";

import Link from "next/link";
import { useState } from "react";
import { useAnnotations, type Highlight } from "@/lib/annotations";
import { ReaderToolbar } from "@/components/ReaderToolbar";

function HighlightCard({ highlight }: { highlight: Highlight }) {
  const { updateHighlightNote, removeHighlight } = useAnnotations();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(highlight.note);

  return (
    <li className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/read/${highlight.chapterSlug}`}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          {highlight.chapterTitle}
        </Link>
        <button
          type="button"
          onClick={() => removeHighlight(highlight.id)}
          aria-label="מחק הדגשה"
          className="text-xs text-muted hover:text-red-500 transition-colors"
        >
          מחק
        </button>
      </div>

      <p className="mt-2 rounded-lg bg-accent/10 px-3 py-2 leading-relaxed">{highlight.text}</p>

      {editing ? (
        <div className="mt-2">
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-20 w-full resize-none rounded-lg border border-border bg-background p-2 text-sm outline-none"
            dir="rtl"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                updateHighlightNote(highlight.id, draft);
                setEditing(false);
              }}
              className="rounded-full bg-accent px-3 py-1 text-xs text-white"
            >
              שמור
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(highlight.note);
                setEditing(false);
              }}
              className="rounded-full px-3 py-1 text-xs text-muted hover:text-foreground"
            >
              ביטול
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mt-2 block w-full text-start text-sm text-muted hover:text-foreground transition-colors"
        >
          {highlight.note ? highlight.note : "+ הוסיפו הערה"}
        </button>
      )}
    </li>
  );
}

export default function LibraryPage() {
  const { bookmarks, highlights, removeBookmark } = useAnnotations();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-frank-ruhl text-3xl font-medium">הספרייה שלי</h1>
          <Link href="/" className="mt-1 block text-sm text-muted hover:text-foreground transition-colors">
            ← תוכן העניינים
          </Link>
        </div>
        <ReaderToolbar />
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-medium text-muted">סימניות</h2>
        {bookmarks.length === 0 ? (
          <p className="text-sm text-muted">אין סימניות עדיין.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
            {bookmarks.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <Link
                  href={`/read/${b.chapterSlug}`}
                  className="font-frank-ruhl hover:text-accent transition-colors"
                >
                  ★ {b.chapterTitle}
                </Link>
                <button
                  type="button"
                  onClick={() => removeBookmark(b.id)}
                  className="text-xs text-muted hover:text-red-500 transition-colors"
                >
                  מחק
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-muted">הדגשות והערות</h2>
        {highlights.length === 0 ? (
          <p className="text-sm text-muted">סמנו טקסט בזמן קריאה כדי להדגיש ולהוסיף הערות.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {highlights.map((h) => (
              <HighlightCard key={h.id} highlight={h} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
