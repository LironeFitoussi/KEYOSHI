import { generateText } from "ai";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { Chunk } from "./chunk.js";

const MODEL = process.env.KEYOSHI_MODEL ?? "anthropic/claude-sonnet-5";
const VOICE_GUIDE_PATH = fileURLToPath(
  new URL("../.claude/skills/avatar-hebrew-translate/SKILL.md", import.meta.url)
);

let cachedVoiceGuide: string | undefined;

async function loadVoiceGuide(): Promise<string> {
  if (!cachedVoiceGuide) {
    cachedVoiceGuide = await readFile(VOICE_GUIDE_PATH, "utf-8");
  }
  return cachedVoiceGuide;
}

export async function translateChunk(chunk: Chunk): Promise<string> {
  const voiceGuide = await loadVoiceGuide();
  const { text } = await generateText({
    model: MODEL,
    system:
      "You translate Avatar-universe book text into fluent literary Hebrew. " +
      "Follow this project's established voice and terminology exactly:\n\n" +
      voiceGuide +
      "\n\nOutput only the Hebrew translation, no notes or commentary.",
    prompt: chunk.text,
  });
  return text;
}

export async function translateChunks(
  chunks: Chunk[],
  onProgress?: (done: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];
  for (const chunk of chunks) {
    results.push(await translateChunk(chunk));
    onProgress?.(results.length, chunks.length);
  }
  return results;
}
