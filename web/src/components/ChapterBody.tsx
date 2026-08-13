"use client";

import { useRef } from "react";
import { useReaderSettings, FONT_CLASS } from "@/lib/reader-settings";
import { useAnnotations, type Highlight } from "@/lib/annotations";
import { HighlightPopover } from "./HighlightPopover";

function renderParagraphWithHighlights(paragraph: string, highlights: Highlight[]) {
  const matches = highlights
    .map((h) => ({ h, index: paragraph.indexOf(h.text) }))
    .filter((m) => m.index !== -1 && m.h.text.length > 0)
    .sort((a, b) => a.index - b.index);

  if (matches.length === 0) return paragraph;

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const { h, index } of matches) {
    if (index < cursor) continue;
    if (index > cursor) nodes.push(paragraph.slice(cursor, index));
    nodes.push(
      <mark
        key={h.id}
        title={h.note || undefined}
        className="rounded bg-accent/25 px-0.5 text-inherit decoration-accent"
      >
        {h.text}
      </mark>
    );
    cursor = index + h.text.length;
  }
  if (cursor < paragraph.length) nodes.push(paragraph.slice(cursor));

  return nodes;
}

export function ChapterBody({
  title,
  paragraphs,
  chapterSlug,
}: {
  title: string;
  paragraphs: string[];
  chapterSlug: string;
}) {
  const { font, fontSize } = useReaderSettings();
  const { highlightsForChapter } = useAnnotations();
  const containerRef = useRef<HTMLDivElement>(null);
  const highlights = highlightsForChapter(chapterSlug);

  return (
    <article ref={containerRef} className={`${FONT_CLASS[font]} relative mx-auto w-full max-w-2xl px-6 pb-24`}>
      <h1 className="mb-8 text-center font-medium" style={{ fontSize: fontSize * 1.35 }}>
        {title}
      </h1>
      <div className="space-y-5 leading-relaxed text-foreground/90" style={{ fontSize }}>
        {paragraphs.map((p, i) =>
          p === "---" ? (
            <div key={i} className="py-2 text-center text-muted" aria-hidden>
              ✳
            </div>
          ) : (
            <p key={i}>{renderParagraphWithHighlights(p, highlights)}</p>
          )
        )}
      </div>
      <HighlightPopover containerRef={containerRef} chapterSlug={chapterSlug} chapterTitle={title} />
    </article>
  );
}
