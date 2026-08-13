import "server-only";

import { cache } from "react";
import { getDatabase } from "@/lib/mongodb";

export interface ChapterMeta {
  number: number;
  title: string;
  slug: string;
}

interface ChapterDocument extends ChapterMeta {
  bookSlug: string;
  body: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BOOK_SLUG = process.env.KEYOSHI_BOOK_SLUG ?? "the-rise-of-kyoshi-he";

export const getManifest = cache(async (): Promise<ChapterMeta[]> => {
  const db = await getDatabase();
  return db
    .collection<ChapterDocument>("chapters")
    .find(
      { bookSlug: BOOK_SLUG, published: true },
      { projection: { _id: 0, number: 1, title: 1, slug: 1 } }
    )
    .sort({ number: 1 })
    .toArray();
});

export const getChapterBySlug = cache(
  async (slug: string): Promise<{ meta: ChapterMeta; body: string } | null> => {
    const db = await getDatabase();
    const chapter = await db.collection<ChapterDocument>("chapters").findOne(
      { bookSlug: BOOK_SLUG, slug, published: true },
      { projection: { _id: 0, number: 1, title: 1, slug: 1, body: 1 } }
    );

    if (!chapter) return null;

    return {
      meta: {
        number: chapter.number,
        title: chapter.title,
        slug: chapter.slug,
      },
      body: chapter.body,
    };
  }
);
