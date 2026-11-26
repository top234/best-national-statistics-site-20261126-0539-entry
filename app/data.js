// NusaData — seluruh angka statistik Indonesia yang ditampilkan situs ini.
// Setiap seri mencantumkan sumber dan tahunnya; tidak ada angka karangan.
// Sumber utama: Badan Pusat Statistik (BPS), Sensus Penduduk 2020,
// Sakernas, Susenas, dan Survei Kesehatan Indonesia (SKI) Kemenkes.

const NUSADATA = {
  // Kartu angka utama di beranda.
  headline: [
    { label: "Penduduk Indonesia", value: "281,6 juta", note: "Pertengahan 2024 · Proyeksi BPS" },
    { label: "Pertumbuhan Ekonomi", value: "5,03%", note: "PDB 2024 · BPS" },
    { label: "Inflasi Tahunan", value: "1,57%", note: "Desember 2024 · BPS" },
    { label: "Kemiskinan", value: "9,03%", note: "Maret 2024 · BPS" },
    { label: "Pengangguran (TPT)", value: "4,82%", note: "Februari 2024 · Sakernas BPS" },
    { label: "Indeks Pembangunan Manusia", value: "75,02", note: "2024 · BPS" },
  ],

  // Jumlah penduduk hasil sensus dan proyeksi, juta jiwa.
  populationSeries: [
    { year: 1971, value: 119.21, kind: "Sensus" },
    { year: 1980, value: 147.49, kind: "Sensus" },
    { year: 1990, value: 179.38, kind: "Sensus" },
    { year: 2000, value: 206.26, kind: "Sensus" },
    { year: 2010, value: 237.64, kind: "Sensus" },
    { year: 2015, value: 255.18, kind: "SUPAS" },
    { year: 2020, value: 270.20, kind: "Sensus" },
    { year: 2024, value: 281.60, kind: "Proyeksi" },
  ],

  // Struktur umur Sensus Penduduk 2020, juta jiwa.
  ageStructure2020: [
    { group: "0–14 tahun", value: 63.0 },
    { group: "15–64 tahun", value: 191.1 },
    { group: "65 tahun ke atas", value: 16.1 },
  ],

  demographyFacts: [
    { label: "Rasio jenis kelamin", value: "102", note: "102 laki-laki per 100 perempuan · SP2020" },
    { label: "Rasio ketergantungan", value: "41,9", note: "Penduduk non-produktif per 100 produktif · SP2020" },
    { label: "Tinggal di perkotaan", value: "56,6%", note: "Dari seluruh penduduk · SP2020" },
    { label: "Kepadatan penduduk", value: "141 jiwa/km²", note: "SP2020" },
    { label: "Jumlah rumah tangga", value: "68,7 juta", note: "Rata-rata 3,9 orang per rumah tangga · SP2020" },
    { label: "Angka kelahiran total (TFR)", value: "2,18", note: "Anak per perempuan · Long Form SP2020" },
  ],

  // Penduduk per provinsi, Sensus Penduduk 2020, juta jiwa (34 provinsi saat sensus).
  provinces2020: [
    { name: "Aceh", value: 5.27 }, { name: "Sumatera Utara", value: 14.80 },
    { name: "Sumatera Barat", value: 5.53 }, { name: "Riau", value: 6.49 },
    { name: "Jambi", value: 3.55 }, { name: "Sumatera Selatan", value: 8.47 },
    { name: "Bengkulu", value: 2.01 }, { name: "Lampung", value: 9.01 },
    { name: "Kep. Bangka Belitung", value: 1.46 }, { name: "Kep. Riau", value: 2.06 },
    { name: "DKI Jakarta", value: 10.56 }, { name: "Jawa Barat", value: 48.27 },
    { name: "Jawa Tengah", value: 36.52 }, { name: "DI Yogyakarta", value: 3.67 },
    { name: "Jawa Timur", value: 40.67 }, { name: "Banten", value: 11.90 },
    { name: "Bali", value: 4.32 }, { name: "Nusa Tenggara Barat", value: 5.32 },
    { name: "Nusa Tenggara Timur", value: 5.33 }, { name: "Kalimantan Barat", value: 5.41 },
    { name: "Kalimantan Tengah", value: 2.67 }, { name: "Kalimantan Selatan", value: 4.07 },
    { name: "Kalimantan Timur", value: 3.77 }, { name: "Kalimantan Utara", value: 0.70 },
    { name: "Sulawesi Utara", value: 2.62 }, { name: "Sulawesi Tengah", value: 2.99 },
    { name: "Sulawesi Selatan", value: 9.07 }, { name: "Sulawesi Tenggara", value: 2.62 },
    { name: "Gorontalo", value: 1.17 }, { name: "Sulawesi Barat", value: 1.42 },
    { name: "Maluku", value: 1.85 }, { name: "Maluku Utara", value: 1.28 },
    { name: "Papua Barat", value: 1.13 }, { name: "Papua", value: 4.30 },
  ],

  // Pertumbuhan PDB tahunan, persen (BPS).
  gdpGrowth: [
    { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
    { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
    { year: 2021, value: 3.69 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  ],

  // Inflasi tahunan Desember ke Desember, persen (BPS).
  inflation: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],

  // Struktur PDB menurut lapangan usaha 2023, persen (BPS, dibulatkan).
  gdpStructure2023: [
    { sector: "Industri pengolahan", value: 18.7 },
    { sector: "Perdagangan", value: 12.9 },
    { sector: "Pertanian & kehutanan", value: 12.5 },
    { sector: "Pertambangan", value: 10.5 },
    { sector: "Konstruksi", value: 10.5 },
    { sector: "Transportasi & gudang", value: 6.2 },
    { sector: "Informasi & komunikasi", value: 4.2 },
    { sector: "Jasa keuangan", value: 4.2 },
    { sector: "Lainnya", value: 20.3 },
  ],

  economyFacts: [
    { label: "PDB harga berlaku 2024", value: "Rp22.139 triliun", note: "BPS" },
    { label: "PDB per kapita 2024", value: "Rp78,6 juta", note: "Sekitar US$4.900 · BPS" },
    { label: "Ekspor 2023", value: "US$258,8 miliar", note: "BPS" },
    { label: "Impor 2023", value: "US$221,9 miliar", note: "Surplus dagang US$36,9 miliar · BPS" },
  ],

  // Tingkat pengangguran terbuka, Februari, persen (Sakernas BPS).
  unemploymentFeb: [
    { year: 2020, value: 4.99 }, { year: 2021, value: 6.26 },
    { year: 2022, value: 5.83 }, { year: 2023, value: 5.45 },
    { year: 2024, value: 4.82 },
  ],

  // Persentase penduduk miskin, Maret, persen (Susenas BPS).
  povertyMarch: [
    { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
    { year: 2021, value: 10.14 }, { year: 2022, value: 9.54 },
    { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
  ],

  // Indeks Pembangunan Manusia (BPS).
  hdi: [
    { year: 2020, value: 71.94 }, { year: 2021, value: 72.29 },
    { year: 2022, value: 72.91 }, { year: 2023, value: 74.39 },
    { year: 2024, value: 75.02 },
  ],

  // Prevalensi stunting balita, persen (SSGI/SKI, Kemenkes & BPS).
  stunting: [
    { year: 2019, value: 27.7 }, { year: 2021, value: 24.4 },
    { year: 2022, value: 21.6 }, { year: 2023, value: 21.5 },
  ],

  // Rata-rata lama sekolah penduduk 25 tahun ke atas, tahun (BPS).
  schoolingYears: [
    { year: 2019, value: 8.34 }, { year: 2020, value: 8.48 },
    { year: 2021, value: 8.54 }, { year: 2022, value: 8.69 },
    { year: 2023, value: 8.77 },
  ],

  wellbeingFacts: [
    { label: "Umur harapan hidup 2023", value: "73,9 tahun", note: "Metode berbasis Long Form SP2020 · BPS" },
    { label: "Harapan lama sekolah 2023", value: "13,13 tahun", note: "BPS" },
    { label: "Angka melek huruf 15+", value: "96,0%", note: "2023 · BPS" },
    { label: "Angka kematian bayi", value: "16,9 per 1.000", note: "Kelahiran hidup · BPS 2022" },
    { label: "Rasio Gini Maret 2024", value: "0,379", note: "Ketimpangan pengeluaran · BPS" },
  ],

  sources: [
    { name: "Sensus Penduduk 2020 (SP2020)", by: "Badan Pusat Statistik", detail: "Sensus lengkap seluruh penduduk Indonesia per September 2020: 270,20 juta jiwa. Dasar tabel provinsi, struktur umur, dan rasio demografi di situs ini." },
    { name: "Proyeksi Penduduk Indonesia", by: "Badan Pusat Statistik", detail: "Proyeksi resmi berbasis SP2020; angka pertengahan 2024 sebesar 281,6 juta jiwa dipakai sebagai angka penduduk terkini." },
    { name: "Berita Resmi Statistik — PDB", by: "Badan Pusat Statistik", detail: "Rilis triwulanan dan tahunan pertumbuhan ekonomi, PDB harga berlaku, dan PDB per kapita." },
    { name: "Sakernas Februari 2024", by: "Badan Pusat Statistik", detail: "Survei Angkatan Kerja Nasional: tingkat pengangguran terbuka 4,82% pada Februari 2024." },
    { name: "Profil Kemiskinan & Gini", by: "Badan Pusat Statistik", detail: "Hasil Susenas Maret: kemiskinan 9,03% (25,22 juta jiwa) dan rasio Gini 0,379 pada Maret 2024." },
    { name: "Indeks Pembangunan Manusia 2024", by: "Badan Pusat Statistik", detail: "IPM Indonesia 75,02 pada 2024, kategori tinggi; dihitung dari umur harapan hidup, pendidikan, dan pengeluaran per kapita." },
    { name: "Survei Kesehatan Indonesia 2023", by: "Kemenkes RI", detail: "Prevalensi stunting balita 21,5% pada 2023, melanjutkan penurunan dari 27,7% pada 2019." },
    { name: "Long Form SP2020", by: "Badan Pusat Statistik", detail: "Sensus sampel lanjutan: angka kelahiran total (TFR) 2,18 dan dasar metode baru umur harapan hidup." },
  ],
};
