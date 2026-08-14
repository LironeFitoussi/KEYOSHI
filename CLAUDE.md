# KEYOSHI

Book → chunks → AI translation → Hebrew.

## Stack

- Node.js + TypeScript, CLI via `commander`
- PDF text extraction: `pdf-parse`
- Translation: Vercel AI SDK (`ai`), model string via `KEYOSHI_MODEL` (default `anthropic/claude-sonnet-5`), routed through Vercel AI Gateway
- Web UI: Next.js 16 app in `web/`, deployed to Vercel, reads chapters from MongoDB at runtime (not filesystem)

## Structure

- `src/extract.ts` — PDF → raw text
- `src/chunk.ts` — paragraph-aligned chunking (~3000 chars/chunk, configurable)
- `src/translate.ts` — per-chunk AI translation to Hebrew
- `src/cli.ts` — `translate` command wiring the pipeline together
- `translations/` — translated chapter output (source material for MongoDB import; not read by deployed app)
- `web/` — Next.js reader app (see `web/README.md`)
  - `web/src/app/` — routes: `/`, `/library`, `/read/[slug]`, `/api/health`
  - `web/src/lib/mongodb.ts` — shared MongoDB connection
  - `web/src/lib/book.ts` — server-only book repository
  - `web/scripts/seed-mongodb.ts` — one-time/idempotent importer, reads `translations/` → MongoDB

## Commands

- `npm run translate -- <pdf> [-o out.md] [-s chunkSize]` — run translation CLI
- `npm run build` — build CLI + web (`build:cli` then `build:web`)
- `npm run dev:web` — run Next.js dev server (`web/`)
- `npm run seed:mongodb` — import `translations/` into MongoDB (run before first prod visit after new chapters)

## Web app deploy (Vercel)

- Vercel project **Root Directory** must be `web`
- Env vars: `MONGODB_URI`, `MONGODB_DB`, `KEYOSHI_BOOK_SLUG` (see `web/.env.example`)
- Vercel auto-detects Next.js, runs `npm run build`
- Verify with `/api/health` (200 = DB connected)
- `npm run seed:mongodb` must be run locally/manually — deploy does not seed data
