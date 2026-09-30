#!/usr/bin/env node
// Usage:
//   node transform.mjs                          -- fetch all translations
//   node transform.mjs en.sahih                 -- single translation by tanzilId
//   node transform.mjs en.sahih fr.hamidullah   -- multiple specific ones

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

const TRANSLATIONS = [
  { tanzilId: 'id.indonesian',   lang: 'id',  name: 'Indonesian',   nativeName: 'Bahasa Indonesia', translator: 'Kementerian Agama RI' },
  { tanzilId: 'en.sahih',        lang: 'en',  name: 'English',      nativeName: 'English',          translator: 'Saheeh International' },
  { tanzilId: 'ar.muyassar',     lang: 'ar',  name: 'Arabic',       nativeName: 'العربية',           translator: 'Tafsir al-Muyassar' },
  { tanzilId: 'fr.hamidullah',   lang: 'fr',  name: 'French',       nativeName: 'Français',         translator: 'Muhammad Hamidullah' },
  { tanzilId: 'de.bubenheim',    lang: 'de',  name: 'German',       nativeName: 'Deutsch',          translator: 'Bubenheim & Elyas' },
  { tanzilId: 'es.cortes',       lang: 'es',  name: 'Spanish',      nativeName: 'Español',          translator: 'Julio Cortes' },
  { tanzilId: 'pt.elhayek',      lang: 'pt',  name: 'Portuguese',   nativeName: 'Português',        translator: 'Samir El-Hayek' },
  { tanzilId: 'it.piccardo',     lang: 'it',  name: 'Italian',      nativeName: 'Italiano',         translator: 'Hamza Roberto Piccardo' },
  { tanzilId: 'tr.diyanet',      lang: 'tr',  name: 'Turkish',      nativeName: 'Türkçe',           translator: 'Diyanet İşleri' },
  { tanzilId: 'ms.basmeih',      lang: 'ms',  name: 'Malay',        nativeName: 'Bahasa Melayu',    translator: 'Abdullah Muhammad Basmeih' },
  { tanzilId: 'bs.korkut',       lang: 'bs',  name: 'Bosnian',      nativeName: 'Bosanski',         translator: 'Besim Korkut' },
  { tanzilId: 'ru.kuliev',       lang: 'ru',  name: 'Russian',      nativeName: 'Русский',          translator: 'Elmir Kuliev' },
  { tanzilId: 'pl.bielawskiego',  lang: 'pl',  name: 'Polish',       nativeName: 'Polski',           translator: 'Józefa Bielawskiego' },
  { tanzilId: 'nl.leemhuis',     lang: 'nl',  name: 'Dutch',        nativeName: 'Nederlands',       translator: 'Fred Leemhuis' },
  { tanzilId: 'sv.bernstrom',    lang: 'sv',  name: 'Swedish',      nativeName: 'Svenska',          translator: 'Knut Bernström' },
  { tanzilId: 'no.berg',         lang: 'no',  name: 'Norwegian',    nativeName: 'Norsk',            translator: 'Einar Berg' },
  { tanzilId: 'zh.jian',         lang: 'zh',  name: 'Chinese',      nativeName: '中文',              translator: 'Ma Jian' },
  { tanzilId: 'ja.japanese',     lang: 'ja',  name: 'Japanese',     nativeName: '日本語',            translator: 'Unknown' },
  { tanzilId: 'ko.korean',       lang: 'ko',  name: 'Korean',       nativeName: '한국어',            translator: 'Unknown' },
  { tanzilId: 'hi.farooq',       lang: 'hi',  name: 'Hindi',        nativeName: 'हिन्दी',            translator: 'Farooq Khan & Ahmed' },
  { tanzilId: 'ur.maududi',      lang: 'ur',  name: 'Urdu',         nativeName: 'اردو',             translator: "Abul A'ala Maududi" },
  { tanzilId: 'fa.makarem',      lang: 'fa',  name: 'Persian',      nativeName: 'فارسی',            translator: 'Naser Makarem Shirazi' },
  { tanzilId: 'bn.hoque',        lang: 'bn',  name: 'Bengali',      nativeName: 'বাংলা',            translator: 'Muhiuddin Khan' },
  { tanzilId: 'az.mammadaliyev', lang: 'az',  name: 'Azerbaijani',  nativeName: 'Azərbaycan',       translator: 'Mammadaliyev & Bunyadov' },
  { tanzilId: 'ml.abdulhameed',  lang: 'ml',  name: 'Malayalam',    nativeName: 'മലയാളം',          translator: 'Abdul Hameed & Parappoor' },
  { tanzilId: 'th.thai',         lang: 'th',  name: 'Thai',         nativeName: 'ภาษาไทย',         translator: 'King Fahad Quran Complex' },
  { tanzilId: 'so.abduh',        lang: 'so',  name: 'Somali',       nativeName: 'Soomaali',        translator: 'Mahmud Muhammad Abduh' },
  { tanzilId: 'sw.barwani',      lang: 'sw',  name: 'Swahili',      nativeName: 'Kiswahili',       translator: 'Ali Muhsin Al-Barwani' },
  { tanzilId: 'ps.abdulwali',    lang: 'ps',  name: 'Pashto',       nativeName: 'پښتو',            translator: 'Abdulwali Khan' },
  { tanzilId: 'tg.ayati',        lang: 'tg',  name: 'Tajik',        nativeName: 'Тоҷикӣ',          translator: 'AbdolMohammad Ayati' },
  { tanzilId: 'uz.sodik',        lang: 'uz',  name: 'Uzbek',        nativeName: "O'zbek",          translator: 'Muhammad Sodik Muhammad Yusuf' },
  { tanzilId: 'tt.nugman',       lang: 'tt',  name: 'Tatar',        nativeName: 'Татар',           translator: 'Yakub Ibn Nugman' },
  { tanzilId: 'sq.nahi',         lang: 'sq',  name: 'Albanian',     nativeName: 'Shqip',           translator: 'Hasan Efendi Nahi' },
  { tanzilId: 'bg.theophanov',   lang: 'bg',  name: 'Bulgarian',    nativeName: 'Български',       translator: 'Tzvetan Theophanov' },
  { tanzilId: 'cs.hrbek',        lang: 'cs',  name: 'Czech',        nativeName: 'Čeština',         translator: 'I. Hrbek' },
  { tanzilId: 'dv.divehi',       lang: 'dv',  name: 'Divehi',       nativeName: 'ދިވެހި',          translator: 'Office of the President of Maldives' },
  { tanzilId: 'am.sadiq',        lang: 'am',  name: 'Amharic',      nativeName: 'አማርኛ',           translator: 'Muhammed Sadiq & Muhammed Sani Habib' },
  { tanzilId: 'ku.asan',         lang: 'ku',  name: 'Kurdish',      nativeName: 'Kurdî',           translator: 'Burhan Muhammad-Amin' },
  { tanzilId: 'ber.mensur',      lang: 'ber', name: 'Amazigh',      nativeName: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',       translator: 'Ramdane At Mansour' },
  { tanzilId: 'sd.amroti',       lang: 'sd',  name: 'Sindhi',       nativeName: 'سنڌي',            translator: 'Taj Mehmood Amroti' },
];

async function fetchTranslation(tanzilId) {
  const url = `https://tanzil.net/trans/${tanzilId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseRaw(raw) {
  const surahs = new Map();
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || t.startsWith('|')) continue;
    const p1 = t.indexOf('|');
    const p2 = t.indexOf('|', p1 + 1);
    if (p1 === -1 || p2 === -1) continue;
    const surah = parseInt(t.slice(0, p1), 10);
    const aya = parseInt(t.slice(p1 + 1, p2), 10);
    const text = t.slice(p2 + 1);
    if (isNaN(surah) || isNaN(aya) || !text) continue;
    if (!surahs.has(surah)) surahs.set(surah, []);
    surahs.get(surah).push({ aya_number: aya, text });
  }
  return surahs;
}

function writeOutput(lang, surahs) {
  const outDir = join(__dir, 'translations', lang);
  mkdirSync(outDir, { recursive: true });
  for (const [surahNum, ayahs] of surahs) {
    writeFileSync(join(outDir, `${surahNum}.json`), JSON.stringify(ayahs), 'utf8');
  }
  return surahs.size;
}

function updateManifest(done) {
  const manifestPath = join(__dir, 'translations', 'manifest.json');
  let manifest = { version: 1, languages: [] };
  if (existsSync(manifestPath)) {
    try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch {}
  }
  const existing = new Map(manifest.languages.map(l => [l.code, l]));
  for (const { lang, name, nativeName } of done) {
    existing.set(lang, { code: lang, name, nativeName, bundled: true });
  }
  manifest.languages = [...existing.values()].sort((a, b) => a.code.localeCompare(b.code));
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  return existing.size;
}

async function main() {
  const args = process.argv.slice(2);

  let targets;
  if (args.length > 0) {
    targets = TRANSLATIONS.filter(t => args.includes(t.tanzilId) || args.includes(t.lang));
    if (targets.length === 0) {
      console.error(`No match for: ${args.join(', ')}`);
      console.error(`Available tanzilIds: ${TRANSLATIONS.map(t => t.tanzilId).join(', ')}`);
      process.exit(1);
    }
  } else {
    targets = TRANSLATIONS;
  }

  console.log(`Processing ${targets.length} translation(s)...\n`);

  const done = [];
  const failed = [];

  for (const t of targets) {
    process.stdout.write(`[${t.tanzilId}] fetching... `);
    try {
      const raw = await fetchTranslation(t.tanzilId);
      const surahs = parseRaw(raw);
      const count = writeOutput(t.lang, surahs);
      console.log(`✓  ${count} surahs → translations/${t.lang}/`);
      done.push(t);
    } catch (err) {
      console.log(`✗  ${err.message}`);
      failed.push({ tanzilId: t.tanzilId, error: err.message });
    }
    await new Promise(r => setTimeout(r, 300));
  }

  if (done.length > 0) {
    const total = updateManifest(done);
    console.log(`\nmanifest.json updated — ${total} language(s) total.`);
  }

  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`);
    for (const f of failed) console.log(`  - ${f.tanzilId}: ${f.error}`);
  }

  console.log(`\nDone. ${done.length} succeeded, ${failed.length} failed.`);
}

main().catch(e => { console.error(e); process.exit(1); });
