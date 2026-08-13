import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { loadEnvConfig } from "@next/env";
import { MongoClient } from "mongodb";

interface SourceChapter {
  number: number;
  title: string;
  slug: string;
  file: string;
}

const webRoot = process.cwd();
loadEnvConfig(webRoot);

const repositoryRoot = path.resolve(webRoot, "..");
const translationsDirectory = path.join(repositoryRoot, "translations");
const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB ?? "keyoshi";
const bookSlug = process.env.KEYOSHI_BOOK_SLUG ?? "the-rise-of-kyoshi-he";

if (!uri) {
  throw new Error("MONGODB_URI is required. Copy web/.env.example to web/.env.local and fill it in.");
}

const manifest = JSON.parse(
  await readFile(path.join(translationsDirectory, "manifest.json"), "utf8")
) as SourceChapter[];

const chapters = await Promise.all(
  manifest.map(async ({ file, ...meta }) => {
    const raw = await readFile(path.join(translationsDirectory, file), "utf8");
    const blocks = raw.replace(/\r\n/g, "\n").split(/\n{2,}/);
    const body = blocks.slice(1).join("\n\n").trim();

    if (!body) throw new Error(`Chapter ${file} has no body.`);

    return { ...meta, body };
  })
);

const client = new MongoClient(uri, { appName: "keyoshi-seed" });

try {
  await client.connect();
  const db = client.db(databaseName);
  const now = new Date();

  await db.collection("books").updateOne(
    { slug: bookSlug },
    {
      $set: {
        title: "עלייתה של קיושי",
        originalTitle: "The Rise of Kyoshi",
        language: "he",
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );

  const collection = db.collection("chapters");
  await collection.createIndex({ bookSlug: 1, slug: 1 }, { unique: true });
  await collection.createIndex({ bookSlug: 1, number: 1 }, { unique: true });

  if (chapters.length > 0) {
    await collection.bulkWrite(
      chapters.map((chapter) => ({
        updateOne: {
          filter: { bookSlug, slug: chapter.slug },
          update: {
            $set: { ...chapter, bookSlug, published: true, updatedAt: now },
            $setOnInsert: { createdAt: now },
          },
          upsert: true,
        },
      }))
    );
  }

  console.log(`Seeded ${chapters.length} chapters into ${databaseName}.chapters.`);
} finally {
  await client.close();
}
