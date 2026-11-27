# NusaData — Statistik Indonesia

![NusaData](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![Peringkat](https://make.fun/badge/best-national-statistics-site-20261126-0539/top234/best-national-statistics-site-20261126-0539-entry/rank.svg)
![Hadiah](https://make.fun/badge/best-national-statistics-site-20261126-0539/top234/best-national-statistics-site-20261126-0539-entry/reward.svg)

NusaData adalah situs statistik nasional Indonesia berbahasa Indonesia: penduduk,
ekonomi, 38 provinsi (dengan peta skematis, tabel yang bisa dicari dan diurutkan,
panel detail, dan perbandingan dua provinsi), kesehatan & pendidikan, kesejahteraan,
serta daftar sumber dan metodologi. Semua angka berasal dari BPS (Sensus Penduduk
2020, Proyeksi Penduduk 2024, Sakernas, Susenas, SSGI); grafik digambar sendiri
dengan canvas, tanpa library dan tanpa request jaringan apa pun.

## Menjalankan lokal

```sh
node serve.ts
# buka http://localhost:8080
```

Atau server statis apa pun dengan `app/` sebagai root:

```sh
python3 -m http.server --directory app 8080
```

## Menyerahkan entri

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis
`dossier.json` dengan library `vendor/makefun-frontend.ts` (salinan kit, tidak diubah).

## Struktur

- `app/index.html` — kerangka situs (navigasi hash, 7 halaman)
- `app/style.css` — gaya: teal tua + amber + krem, sistem font
- `app/data.js` — semua dataset (BPS, Sensus 2020, Sakernas, Susenas, SSGI)
- `app/charts.js` — grafik garis, bar, dan donat di canvas
- `app/map.js` — peta skematis Indonesia (SVG hasil gambar sendiri)
- `app/views.js` — render tiap halaman + semua kontrol (rentang, cari, urut, bandingkan)
- `app/main.js` — router hash
- `screenshots/` — 4 render asli situs di browser (beranda, ekonomi, provinsi, beranda di ponsel)

## Lisensi

MIT — lihat `LICENSE`.
