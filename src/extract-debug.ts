import { writeFile } from "node:fs/promises";
import { extractText } from "./extract.js";

const text = await extractText(process.argv[2]);
await writeFile(process.argv[3], text, "utf-8");
console.log(`Extracted ${text.length} chars`);
