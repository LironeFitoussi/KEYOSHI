---
name: avatar-hebrew-translate
description: Translate Avatar-universe book chunks (English) into fluent literary Hebrew matching the established KEYOSHI voice — Kiyoshi's origin story, Earth Kingdom / Air Nomad / Water Tribe / Fire Nation setting. Use for every chunk translated in this project, whether via CLI pipeline prompts or manual review, to keep terminology and tone consistent across chapters.
---

# Avatar Hebrew Translation Voice

Reference sample: `part_translated.docx` (chapters 1-3, professionally translated — treat as ground truth for voice/terminology).

## Register

- Modern, flowing literary Hebrew — not stiff/formal, not slangy. Reads like a published fantasy novel.
- Free indirect style: character's inner thoughts blend into narration without quote marks (e.g. "הממ. הם בכלל לא ציפו לתוצאה אמיתית היום").
- Short punchy sentences/fragments for tension or humor. Don't over-smooth into long formal clauses.
- Em-dash (—) used heavily for interruptions, asides, comic timing. Preserve that rhythm, don't replace with commas.
- Sarcasm/banter between characters (Genzo/Kelsang, Yon/Hei-Ran) stays sharp and dry — translate wit, not just words.

## Terminology (locked — do not vary)

| English | Hebrew | Notes |
|---|---|---|
| Avatar | אווטאר | |
| Kiyoshi | קיושי | protagonist |
| Genzo | ג'ינזו | Earth sage/master |
| Kelsang | קֵלסאנג | Air Nomad monk |
| Korak (previous Avatar) | קורוק | |
| Yon (current Avatar) | יון | |
| Rangi | ראנגי | firebender bodyguard |
| Hei-Ran | היי-ראן | fire master, Rangi's mother |
| Aoma | אואמה | village bully |
| Suzo / Jai | סוזו / ג'אי | village kids |
| Earth Kingdom | ממלכת האדמה | |
| Air Nomads | נוודי האוויר | |
| Water Tribe(s) | שבט/שבטי המים | |
| Fire Nation | אומת האש | |
| Fifth Nation (pirates) | האומה החמישית | |
| Ba Sing Se | בא סינג סה | |
| earthbending / firebending / airbending | כשפות אדמה / אש / אוויר | "bender" = כשף/כשפית (m/f) |
| bison (flying) | ביזון מעופף | Pengpeng = פֶּנְגְ-פֶּנְג |
| Avatar Yangchen | אווטאר יאנגצ'ן | |
| Dai Fei (gang) | דאופיי | |
| neutral jing | ג'ינג ניטרלי | keep untranslated martial term + gloss once if new reader |
| Pai Sho | פאי שו | |
| Ummi | אוּמי | woman from Kuruk's past, mentioned ch.5 |
| Tagaka | טאגאקה | Fifth Nation (pirate) leader |
| Avatar Salai | אווטאר סאלאי | past Avatar, mentioned alongside Yangchen |
| daofei (outlaw gangs) | דאופיי | generic term for outlaw/pirate gangs, distinct from the Dai Fei gang name |
| jian (sword) | חרב ג'יאן | keep "ג'יאן" transliterated, gloss as sword type |

Keep transliterating new proper nouns the same way: phonetic Hebrew, no nikud except where needed for disambiguation on first use (e.g. קֵלסאנג, פֶּנְגְ-פֶּנְג already carry partial nikud in source — preserve that pattern for new hard-to-read names).

## Structure conventions

- Chapter headers: `פרק <N> - <title>` (e.g. `פרק 1 - המבחן`).
- Scene breaks inside a chapter: a line containing only `---`.
- Dialogue uses Hebrew gershayim for quotes: `״...״` (open/close both render as ״), not `"..."`.
- Keep paragraph breaks where the source has them — don't merge or over-split.

## Translation process for a chunk

1. Read the chunk with surrounding context (previous chunk's last paragraph) if available, to keep pronoun/tense continuity.
2. Translate for meaning and voice first, literal accuracy second — this is literary fiction, not technical text.
3. Apply the terminology table exactly; if a new proper noun appears, transliterate phonetically and add it to the table in this file for future consistency.
4. Preserve em-dashes, fragments, and free-indirect-style thought insertions as a stylistic device.
5. Re-read the Hebrew output alone (without the English) — it should read as natural published Hebrew fiction, not a translation.

## When updating `src/translate.ts`

The system prompt there should reflect this voice, not generic "translate to Hebrew." Point it at this file's terminology table and register notes rather than duplicating them inline — keep this SKILL.md as the single source of truth for voice/terminology.
