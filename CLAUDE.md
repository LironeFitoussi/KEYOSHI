# KEYOSHI

Book → chunks → AI translation → Hebrew.

## Stack

- Node.js + TypeScript, CLI via `commander`
- PDF text extraction: `pdf-parse`
- Translation: Vercel AI SDK (`ai`), model string via `KEYOSHI_MODEL` (default `anthropic/claude-sonnet-5`), routed through Vercel AI Gateway
- Web UI (Next.js) planned but not yet started — CLI first

## Structure

- `src/extract.ts` — PDF → raw text
- `src/chunk.ts` — paragraph-aligned chunking (~3000 chars/chunk, configurable)
- `src/translate.ts` — per-chunk AI translation to Hebrew
- `src/cli.ts` — `translate` command wiring the pipeline together

## Commands

- `npm run translate -- <pdf> [-o out.md] [-s chunkSize]`
- `npm run build` — compile TS to `dist/`
