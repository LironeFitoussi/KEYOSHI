#!/usr/bin/env node
import { Command } from "commander";
import { writeFile } from "node:fs/promises";
import { extractText } from "./extract.js";
import { chunkText } from "./chunk.js";
import { translateChunks } from "./translate.js";

const program = new Command();

program
  .name("keyoshi")
  .description("Split a book (PDF) into chunks and translate to Hebrew using AI");

program
  .command("translate")
  .description("Translate a PDF book to Hebrew")
  .argument("<pdf>", "path to source PDF")
  .option("-o, --out <file>", "output file", "translated.he.md")
  .option("-s, --chunk-size <chars>", "max characters per chunk", "3000")
  .action(async (pdfPath: string, opts: { out: string; chunkSize: string }) => {
    console.log(`Extracting text from ${pdfPath}...`);
    const text = await extractText(pdfPath);

    const chunks = chunkText(text, Number(opts.chunkSize));
    console.log(`Split into ${chunks.length} chunks. Translating...`);

    const translated = await translateChunks(chunks, (done, total) => {
      console.log(`  [${done}/${total}] translated`);
    });

    await writeFile(opts.out, translated.join("\n\n"), "utf-8");
    console.log(`Done. Written to ${opts.out}`);
  });

program.parseAsync(process.argv);
