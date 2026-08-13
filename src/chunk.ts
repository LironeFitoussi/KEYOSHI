export interface Chunk {
  index: number;
  text: string;
}

/**
 * Splits text into chunks near maxChars, breaking on paragraph boundaries
 * so sentences aren't cut mid-way (keeps translation quality/context intact).
 */
export function chunkText(text: string, maxChars = 3000): Chunk[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: Chunk[] = [];
  let current = "";

  for (const para of paragraphs) {
    if (current && current.length + para.length + 2 > maxChars) {
      chunks.push({ index: chunks.length, text: current });
      current = para;
    } else {
      current = current ? `${current}\n\n${para}` : para;
    }
  }
  if (current) chunks.push({ index: chunks.length, text: current });

  return chunks;
}
