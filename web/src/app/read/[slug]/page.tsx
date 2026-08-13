import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapterBySlug, getManifest } from "@/lib/book";
import { ChapterBody } from "@/components/ChapterBody";
import { ReaderToolbar } from "@/components/ReaderToolbar";

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [chapter, manifest] = await Promise.all([getChapterBySlug(slug), getManifest()]);

  if (!chapter) notFound();

  const paragraphs = chapter.body.split("\n\n").filter(Boolean);
  const index = manifest.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? manifest[index - 1] : null;
  const next = index >= 0 && index < manifest.length - 1 ? manifest[index + 1] : null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
            ← תוכן העניינים
          </Link>
          <ReaderToolbar chapterSlug={chapter.meta.slug} chapterTitle={chapter.meta.title} />
        </div>
      </div>

      <div className="flex-1 pt-10">
        <ChapterBody title={chapter.meta.title} paragraphs={paragraphs} chapterSlug={chapter.meta.slug} />
      </div>

      <nav className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 border-t border-border px-6 py-6 text-sm">
        {prev ? (
          <Link href={`/read/${prev.slug}`} className="text-muted hover:text-foreground transition-colors">
            → {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/read/${next.slug}`} className="text-muted hover:text-foreground transition-colors">
            {next.title} ←
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
