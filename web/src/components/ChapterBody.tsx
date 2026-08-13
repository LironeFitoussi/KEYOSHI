"use client";

import { useReaderSettings, FONT_CLASS } from "@/lib/reader-settings";

export function ChapterBody({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  const { font, fontSize } = useReaderSettings();

  return (
    <article className={`${FONT_CLASS[font]} mx-auto w-full max-w-2xl px-6 pb-24`}>
      <h1
        className="mb-8 text-center font-medium"
        style={{ fontSize: fontSize * 1.35 }}
      >
        {title}
      </h1>
      <div
        className="space-y-5 leading-relaxed text-foreground/90"
        style={{ fontSize }}
      >
        {paragraphs.map((p, i) =>
          p === "---" ? (
            <div key={i} className="py-2 text-center text-muted" aria-hidden>
              ✳
            </div>
          ) : (
            <p key={i}>{p}</p>
          )
        )}
      </div>
    </article>
  );
}
