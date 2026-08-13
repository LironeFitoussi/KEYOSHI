---
name: avatar-hebrew-translate
description: Translate Avatar-universe book chunks (English) into fluent literary Hebrew matching the established KEYOSHI voice — Kiyoshi's origin story, Earth Kingdom / Air Nomad / Water Tribe / Fire Nation setting. Use for every chunk translated in this project, whether via CLI pipeline prompts or manual review, to keep terminology and tone consistent across chapters.
---

# Avatar Hebrew Translation Voice

Reference sample: `part_translated.docx` (chapters 1-3, professionally translated — treat as ground truth for voice/terminology).

Source chunks: `pdf/chapters/<NN>_<slug>.txt` — one file per chapter, already split (all 32 chapters present). Do not re-extract from the PDF; read the matching chapter file directly.

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
| Jianzhu | ג'יאנזו | Earth sage/master, Yon's mentor — established usage in ch.1-6 translations despite "Genzo" row above; use ג'יאנזו |
| Amak | אמאק | Water Tribe master, ch.7 |
| Yellow Necks | בעלי הצווארון הצהוב | rebel/outlaw gang, ch.1, 7, and later chapters |
| Zhulu Pass | מעבר זולו | battle site associated with Jianzhu |
| Fade-Red Devils | שדי האדום-הדוהה | defeated pirate crew, ch.7 |
| Yachey Hong | יאצ'יי הונג | leader of the Fade-Red Devils |
| Chameleon Bay | מפרץ הזיקית | ch.7 |
| Madam Qiji | גברת קיג'י | ch.7 |
| Tu Zin | טו זין | location, ch.7 |
| Zeizhou Province | פרובינציית זייג'ואו | ch.7 |
| Pianhai method | שיטת פיאנהאי | ceremonial calligraphy method, ch.7 |
| Living Typhoon | הטייפון החי | Kelsang's pirate-era nickname |
| Crowding Bridge (stance) | תנוחת הגשר ההומה | earthbending stance name, ch.7 |
| Auntie Mui | דודה מוּי | ch.7, mentioned by Kyoshi |
| otter penguin | פינגווין-לוטרה | Southern Water Tribe wildlife |
| Hui (chamberlain) | הוּי | rival chamberlain/political enemy of Jianzhu, ch.13 |
| Professor Shaw | פרופסור שוֹ | Head of Zoology, Ba Sing Se University, ch.13 |
| shirshu | שירשוּ | animal, mentioned ch.13 (later a major creature in the book) |
| Jesa | ג'סה | Kyoshi's mother, daofei founder, ch.14 |
| Hark | הארק | Kyoshi's father, daofei founder, ch.14 |
| Lao Ge | לאו גֶה | old daofei gang member, ch.14 |
| Flitting Sparrowkeet Wong | וונג הדרור המרפרף | daofei gang member, ch.14 |
| Kirima | קירימה | Water Tribe daofei gang member, ch.14 |
| Bullet Lek | לֶק הכדור | daofei gang member; also called Skullcrusher Lek (לֶק מרסק-הגולגולות) and Lek of the Whistling Death (לֶק ממוות הצוחק), ch.14 |
| Si Wong (tribes) | סי וונג | desert tribes, ch.14 |
| Misty Palms Oasis | נווה המדבר עלטת-הדקלים | location, ch.16, Lek's origin |
| dust-stepping | צעידת-אבק | Kirima/Wong's gang's earthbending/waterbending sky-running technique, ch.16 |
| mist-stepping | צעידת-ערפל | Kirima's waterbending variant of dust-stepping, ch.16 |
| Lek (Bullet Lek) | לק (לק הכדור) | earthbender, Flying Opera Company, ch.16, 18-19 |
| Kirima | קירימה | waterbender, Flying Opera Company |
| Wong | ווֹנג | earthbender, Flying Opera Company, "the Flitting Sparrowkeet" |
| Lao Ge | לאו גה | old man, Flying Opera Company, secretly Taigawi the Immortal |
| Taihua Mountains | הרי טאיהואה | ch.18, mountain range south of Ba Sing Se |
| Si Wong (desert) | סי וונג | ch.18, source of red dust storms |
| Hujiang | חוג'יאנג | daofei outlaw town in the Taihua Mountains, ch.18-19 |
| Jesa | ג'סה | Kyoshi's mother, Air Nomad, founded the gang with Hark |
| Hark | הארק | Kyoshi's father, founded the gang with Jesa |
| Longyan | לונגיאן | Jesa's sky bison, lost after her death |
| Qinchao Village | כפר צ'ינצ'או | village neighboring Yokoya, ch.18 |
| Moon-Seizing Zhu | ג'ו תופס-הירח | daofei fighter with a muck rake weapon, ch.18 |
| Mok (the Accountant) | מוק (החשבונאי) | Autumn Bloom Society elder/leader, "Uncle Mok", ch.18-19 |
| Brother Wai | האח וואי | Mok's lieutenant, silent knife-wielder, ch.18-19 |
| Autumn Bloom Society | אגודת פריחת הסתיו | daofei society that the Flying Opera Company is bound to, ch.18 |
| moon peach blossom | פרח אפרסק-ירח | Autumn Bloom Society's identifying symbol/flower |
| lei tai | ליי טאי | platform fighting-challenge ring/tournament, ch.18 |
| Te Sihung (Governor Te) | טה סיהונג (המושל טה) | Eastern Provinces governor, keeps a prison instead of executing criminals, ch.18 |
| Poems of Laghima | שירי לגהימה | book, gift Governor Te once sent to Yon |

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
