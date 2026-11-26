// NusaData — program penyerahan entri "Make the best national statistics site" (Node 22, pustaka standar saja).
//
// Situsnya sendiri adalah folder app/ di samping berkas ini: berkas statis polos yang dibuka peramban
// di app/index.html (HTML + CSS + JavaScript biasa, tanpa langkah build), dan seluruh isinya berada di
// berkas-berkasnya sendiri — tidak ada yang dimuat lewat jaringan. Program ini menyerahkan situs itu:
// app/ dan screenshots/ disalin ke /output, lalu /output/dossier.json ditulis dengan buildDossier dari
// vendor/makefun-frontend.ts — ringkasan yang dibaca juri (screenshot, berkas muatan pertama beserta
// ukurannya, dan sumber situs). Berkas vendor itu salinan kit apa adanya: penilai menuntut dossier.json
// sama persis byte demi byte dengan hasil salinannya sendiri, jadi jangan diubah.
//
// Di luar penilai, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Pratinjau lokal: node serve.ts, lalu buka http://localhost:8080.

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Batas-batas penilai (gate): dossier dibentuk dengan batas yang sama agar entri yang
// akan ditolak penilai sudah gagal di sini, bukan sesudah diserahkan.
const DOSSIER_LIMITS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true });

mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
const screenshotsDir = join(repoDir, 'screenshots');
if (existsSync(screenshotsDir)) {
  cpSync(screenshotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

const dossier = buildDossier(outputDir, DOSSIER_LIMITS);
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// Satu baris ringkasan di log agar penyerahan yang berhasil mudah dikenali dari catatannya;
// berkas-berkas di /output tidak berubah oleh baris ini.
const handedIn = readdirSync(join(outputDir, 'app')).length;
console.log(`NusaData handed in: app/ (${handedIn} files), screenshots/, dossier.json (${dossier.length} bytes).`);
