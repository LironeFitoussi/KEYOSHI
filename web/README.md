# KEYOSHI Reader

Next.js reader application for Vercel. Published books and chapters are read from MongoDB at runtime; the application does not read chapter content from the local filesystem.

## Architecture

```text
web/
  src/app/            Next.js routes and UI
  src/lib/mongodb.ts  shared MongoDB connection
  src/lib/book.ts     server-only book repository
  scripts/            one-time data import tools
translations/         source material for imports; not used by the deployed app
src/                  standalone translation CLI
```

Browser-only reader preferences, bookmarks, and highlights remain in `localStorage`. Moving personal data to MongoDB should be done together with authentication so one reader cannot access another reader's notes.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Set `MONGODB_URI` to a MongoDB Atlas or local MongoDB connection string.
3. Install dependencies from this directory with `npm install`.
4. Import the translated chapters with `npm run seed:mongodb`.
5. Start the app with `npm run dev`.

If Node reports `querySrv ECONNREFUSED` while resolving an Atlas URI, set the optional `MONGODB_DNS_SERVERS` variable to comma-separated DNS server IP addresses. It is normally unnecessary on Vercel.

If a local Next.js runtime still cannot perform SRV lookups, use Atlas's standard `mongodb://` connection string locally instead of `mongodb+srv://`. The application supports both formats.

The importer is idempotent: rerunning it updates matching chapters instead of duplicating them. It also creates unique indexes for chapter slugs and chapter numbers within a book.

See [`docs/database.md`](docs/database.md) for the collection schema and indexes.

## Deploy to Vercel

1. Import the Git repository into Vercel.
2. Set the project's **Root Directory** to `web`.
3. Add `MONGODB_URI`, `MONGODB_DB`, and `KEYOSHI_BOOK_SLUG` in Project Settings → Environment Variables.
4. Deploy. Vercel detects Next.js and runs `npm run build`.
5. Check `/api/health`; a successful connection returns HTTP 200.

Run `npm run seed:mongodb` locally before the first production visit. The seed command reads the repository's `translations/` directory, while the deployed reader only reads MongoDB.
