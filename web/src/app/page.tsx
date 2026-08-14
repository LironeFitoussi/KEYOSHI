import Link from "next/link";
import { getBook, getManifest } from "@/lib/book";
import { ReaderToolbar } from "@/components/ReaderToolbar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [book, chapters] = await Promise.all([getBook(), getManifest()]);
  const bookTitle = book?.title ?? "הספר אינו זמין";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
      <header className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-frank-ruhl text-3xl font-medium">{bookTitle}</h1>
          <p className="mt-1 text-sm text-muted">
            {chapters.length} {chapters.length === 1 ? "פרק זמין" : "פרקים זמינים"}
          </p>
        </div>
        <ReaderToolbar />
      </header>

      {chapters.length === 0 ? (
        <p className="text-muted">עדיין אין פרקים מתורגמים. הריצו את סוכן התרגום כדי להתחיל.</p>
      ) : (
        <ol className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
          {chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link
                href={`/read/${chapter.slug}`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-background"
              >
                <span className="font-frank-ruhl text-lg">{chapter.title}</span>
                <span className="text-xs text-muted">{String(chapter.number).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
