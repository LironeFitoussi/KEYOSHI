import { readFile } from "node:fs/promises";
// pdf-parse has no ESM types; import default via require-style interop
import pdfParse from "pdf-parse";

export async function extractText(pdfPath: string): Promise<string> {
  const buffer = await readFile(pdfPath);
  const result = await pdfParse(buffer);
  return result.text;
}
