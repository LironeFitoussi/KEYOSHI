import { readFile } from "node:fs/promises";
import path from "node:path";

const TRANSLATIONS_DIR = path.join(process.cwd(), "..", "translations");

export interface ChapterMeta {
  number: number;
  title: string;
  slug: string;
  file: string;
}

export async function getManifest(): Promise<ChapterMeta[]> {
  const raw = await readFile(path.join(TRANSLATIONS_DIR, "manifest.json"), "utf-8");
  const manifest = JSON.parse(raw) as ChapterMeta[];
  return [...manifest].sort((a, b) => a.number - b.number);
}

export async function getChapterBySlug(slug: string): Promise<{ meta: ChapterMeta; body: string } | null> {
  const manifest = await getManifest();
  const meta = manifest.find((c) => c.slug === slug);
  if (!meta) return null;

  const raw = await readFile(path.join(TRANSLATIONS_DIR, meta.file), "utf-8");
  const [, ...rest] = raw.split("\n\n");
  const body = rest.join("\n\n").trim();

  return { meta, body };
}
