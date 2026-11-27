// NusaData v2 — Statistik Indonesia (Node 22, standard library only).
// Situsnya adalah app/ di sebelah file ini: file statis yang dibuka browser di
// app/index.html (ES module, CSS, tanpa build step), isinya dari file-file itu
// sendiri: tidak ada yang dimuat lewat jaringan. Program ini menyerahkan situs:
// menyalin app/ dan screenshots/ dari sebelah file ini ke /output dan menulis
// /output/dossier.json, ringkasan yang dibaca juri (screenshot, file dan byte
// muatan pertama, dan sumbernya), dengan library make.fun yang di-vendor.
// Biarkan vendor/makefun-frontend.ts apa adanya: scorer menuntut dossier.json
// sama persis byte demi byte dengan yang ditulis copy library itu sendiri.
//
// Jalankan lokal dengan `node serve.ts`, lalu buka http://localhost:8080.
// Di luar container grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas scorer (reference/gate.json): hanya text_max_bytes membentuk byte;
// yang lain menolak entri yang akan ditolak scorer (lebih dari 4 screenshot
// atau satu di atas 256 KiB; lebih dari 993 file dan direktori di app/ atau
// 16 MiB file app/: app/ dihitung di samping batas 1000 entri /output,
// screenshots/ dan dossier.json-nya).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Ringkasan kecil untuk log build lokal (grader mengabaikan stdout).
const dossierBytes = statSync(join(out, 'dossier.json')).size;
console.log(`NusaData v2 diserahkan ke ${out} (dossier.json ${dossierBytes} byte).`);
