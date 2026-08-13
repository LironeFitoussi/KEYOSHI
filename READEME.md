# KEYOSHI

Split a book (PDF) into chunks and translate to Hebrew using AI.

## Usage

```bash
npm install
npm run translate -- <path-to-book.pdf> -o translated.he.md
```

## How it works

1. **Extract** — pulls raw text from the source PDF (`src/extract.ts`).
2. **Chunk** — splits text into paragraph-aligned chunks (~3000 chars) so translation keeps context (`src/chunk.ts`).
3. **Translate** — sends each chunk to an AI model via the [AI SDK](https://ai-sdk.dev), targeting Hebrew (`src/translate.ts`).
4. **Output** — chunks are rejoined and written to a markdown file.

## Configuration

- `KEYOSHI_MODEL` env var selects the model (default: `anthropic/claude-sonnet-5`, routed through the Vercel AI Gateway).

## Roadmap

- Web UI for upload + review/edit of translations (Next.js, planned).
- Support additional input formats (EPUB, txt).
