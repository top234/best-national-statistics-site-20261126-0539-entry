// NusaData — semua angka situs. Sumber: BPS (Sensus Penduduk, Proyeksi Penduduk,
// Sakernas, Susenas, SSGI) kecuali dinyatakan lain. Angka dibulatkan ke satu desimal;
// "—" berarti angka tidak ditampilkan karena tidak diyakini, bukan nol.

export const KPIS = [
  { label: "Penduduk", value: "281,6", unit: "juta", src: "Pertengahan 2024, Proyeksi BPS" },
  { label: "Pertumbuhan ekonomi", value: "5,03", unit: "%", src: "PDB 2024, BPS" },
  { label: "Inflasi", value: "1,57", unit: "%", src: "Desember 2024, BPS" },
  { label: "Kemiskinan", value: "9,03", unit: "%", src: "Maret 2024, BPS" },
  { label: "Pengangguran (TPT)", value: "4,82", unit: "%", src: "Februari 2024, Sakernas BPS" },
  { label: "IPM", value: "75,02", unit: "", src: "2024, BPS" },
];

// Penduduk Indonesia, juta jiwa. 1971–2020 sensus; 2015 SUPAS; 2024 proyeksi.
export const POPULATION = [
  { year: 1971, value: 119.2 }, { year: 1980, value: 147.5 },
  { year: 1990, value: 179.4 }, { year: 2000, value: 206.3 },
  { year: 2010, value: 237.6 }, { year: 2015, value: 255.5 },
  { year: 2020, value: 270.2 }, { year: 2024, value: 281.6 },
];

// Lima provinsi terpadat, juta jiwa, Sensus Penduduk 2020.
export const TOP_PROVINCES = [
  { name: "Jawa Barat", value: 48.3 },
  { name: "Jawa Timur", value: 40.7 },
  { name: "Jawa Tengah", value: 36.5 },
  { name: "Sumatera Utara", value: 14.8 },
  { name: "Banten", value: 11.9 },
];

// Struktur umur 2020, juta jiwa dan pangsa, Sensus Penduduk 2020.
export const AGE_STRUCTURE = [
  { label: "0–14 tahun", value: 63.0, share: "23,3%", color: "#f2a93b" },
  { label: "15–64 tahun", value: 191.1, share: "70,7%", color: "#0f4c4a" },
  { label: "65+ tahun", value: 16.1, share: "6,0%", color: "#7fb3ae" },
];

export const DEMOGRAPHY = [
  { label: "Rasio jenis kelamin", value: "102", note: "102 laki-laki per 100 perempuan (2020)" },
  { label: "Rasio ketergantungan", value: "41,9", note: "Setiap 100 penduduk usia kerja menanggung ~42 penduduk non-kerja (2020)" },
  { label: "Laju tumbuh penduduk", value: "1,25%/thn", note: "Periode 2010–2020, turun dari 1,49%/thn pada 2000–2010" },
  { label: "Penduduk usia produktif", value: "70,7%", note: "191,1 juta jiwa berusia 15–64 tahun (2020) — jendela bonus demografi" },
];

// Pertumbuhan PDB, % per tahun, BPS.
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// Inflasi tahunan (yoy Desember), %, BPS.
export const INFLATION = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Pangsa sektor terhadap PDB 2024, %, BPS. "Lainnya" = sisa dari 100%.
export const SECTORS = [
  { name: "Industri pengolahan", value: 18.7 },
  { name: "Perdagangan", value: 13.0 },
  { name: "Pertanian, kehutanan & perikanan", value: 12.5 },
  { name: "Konstruksi", value: 10.0 },
  { name: "Pertambangan & penggalian", value: 9.0 },
  { name: "Sektor lainnya", value: 36.8 },
];

// Indeks Pembangunan Manusia 2015–2024, BPS.
export const HDI = [
  { year: 2015, value: 69.55 }, { year: 2016, value: 70.18 },
  { year: 2017, value: 70.81 }, { year: 2018, value: 71.39 },
  { year: 2019, value: 71.92 }, { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 }, { year: 2022, value: 72.91 },
  { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
];

// Tingkat kemiskinan, % penduduk, Maret, BPS.
export const POVERTY = [
  { year: 2015, value: 11.13 }, { year: 2016, value: 10.86 },
  { year: 2017, value: 10.64 }, { year: 2018, value: 9.82 },
  { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 },
  { year: 2021, value: 10.14 }, { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
];

export const WELFARE = {
  poverty: { value: "9,03%", note: "Maret 2024, BPS — 25,22 juta penduduk miskin" },
  povertyLine: { value: "≈ Rp 583 ribu", note: "Garis kemiskinan per kapita per bulan, Maret 2024, BPS" },
  unemployment: { value: "4,82%", note: "TPT Februari 2024, Sakernas BPS — 7,20 juta penganggur" },
  gini: { value: "0,379", note: "Rasio Gini Maret 2024, BPS (0 = merata sempurna, 1 = timpang sempurna)" },
  ruralPoverty: { value: "≈ 11,8%", note: "Kemiskinan perdesaan, Maret 2024 (perkiraan BPS)" },
  urbanPoverty: { value: "≈ 7,1%", note: "Kemiskinan perkotaan, Maret 2024 (perkiraan BPS)" },
};

export const HEALTH_EDU = {
  hdi: { value: "75,02", note: "IPM 2024, BPS — kategori tinggi" },
  lifeExpectancy: { value: "≈ 74 tahun", note: "Harapan hidup saat lahir, 2024, BPS" },
  stunting: { value: "19,8%", note: "Prevalensi stunting balita, SSGI 2024" },
  meanSchooling: { value: "≈ 9,1 tahun", note: "Rata-rata lama sekolah penduduk 25+, 2024, BPS" },
  expectedSchooling: { value: "≈ 13,2 tahun", note: "Harapan lama sekolah, 2024, BPS" },
  literacy: { value: "≈ 97%", note: "Angka melek huruf penduduk 15+, 2024, BPS" },
};

// 38 provinsi. Penduduk = juta jiwa, Sensus Penduduk 2020 (dibulatkan).
// IPM 2024 dan kemiskinan Maret 2024 hanya diisi bila diyakini; selebihnya null ("—").
export const PROVINCES = [
  { name: "Aceh", pop: 5.3, ipm: null, poverty: null },
  { name: "Sumatera Utara", pop: 14.8, ipm: null, poverty: null },
  { name: "Sumatera Barat", pop: 5.5, ipm: null, poverty: null },
  { name: "Riau", pop: 6.5, ipm: null, poverty: null },
  { name: "Jambi", pop: 3.5, ipm: null, poverty: null },
  { name: "Sumatera Selatan", pop: 8.5, ipm: null, poverty: null },
  { name: "Bengkulu", pop: 2.0, ipm: null, poverty: null },
  { name: "Lampung", pop: 9.0, ipm: null, poverty: null },
  { name: "Kepulauan Bangka Belitung", pop: 1.5, ipm: null, poverty: null },
  { name: "Kepulauan Riau", pop: 2.1, ipm: null, poverty: null },
  { name: "DKI Jakarta", pop: 10.6, ipm: 83.0, poverty: null },
  { name: "Jawa Barat", pop: 48.3, ipm: null, poverty: 7.5 },
  { name: "Jawa Tengah", pop: 36.5, ipm: null, poverty: null },
  { name: "DI Yogyakarta", pop: 3.7, ipm: 81.0, poverty: null },
  { name: "Jawa Timur", pop: 40.7, ipm: null, poverty: null },
  { name: "Banten", pop: 11.9, ipm: null, poverty: null },
  { name: "Bali", pop: 4.3, ipm: 78.0, poverty: null },
  { name: "Nusa Tenggara Barat", pop: 5.3, ipm: null, poverty: null },
  { name: "Nusa Tenggara Timur", pop: 5.3, ipm: null, poverty: null },
  { name: "Kalimantan Barat", pop: 5.4, ipm: null, poverty: null },
  { name: "Kalimantan Tengah", pop: 2.7, ipm: null, poverty: null },
  { name: "Kalimantan Selatan", pop: 4.1, ipm: null, poverty: null },
  { name: "Kalimantan Timur", pop: 3.8, ipm: null, poverty: null },
  { name: "Kalimantan Utara", pop: 0.7, ipm: null, poverty: null },
  { name: "Sulawesi Utara", pop: 2.6, ipm: null, poverty: null },
  { name: "Sulawesi Tengah", pop: 3.0, ipm: null, poverty: null },
  { name: "Sulawesi Selatan", pop: 9.1, ipm: null, poverty: null },
  { name: "Sulawesi Tenggara", pop: 2.6, ipm: null, poverty: null },
  { name: "Gorontalo", pop: 1.2, ipm: null, poverty: null },
  { name: "Sulawesi Barat", pop: 1.5, ipm: null, poverty: null },
  { name: "Maluku", pop: 1.9, ipm: null, poverty: null },
  { name: "Maluku Utara", pop: 1.3, ipm: null, poverty: null },
  { name: "Papua Barat", pop: 1.1, ipm: null, poverty: null },
  { name: "Papua", pop: 4.3, ipm: null, poverty: 23.0 },
  { name: "Papua Selatan", pop: 0.5, ipm: null, poverty: null },
  { name: "Papua Tengah", pop: 1.3, ipm: null, poverty: null },
  { name: "Papua Pegunungan", pop: 1.4, ipm: 62.0, poverty: null },
  { name: "Papua Barat Daya", pop: 0.6, ipm: null, poverty: null },
];

export const SOURCES = [
  { name: "Sensus Penduduk 2020", desc: "BPS — jumlah penduduk, struktur umur, sebaran provinsi. Dilaksanakan tiap 10 tahun." },
  { name: "Proyeksi Penduduk 2024", desc: "BPS — penduduk pertengahan tahun 2024 sebesar 281,6 juta jiwa." },
  { name: "SUPAS 2015", desc: "Survei Penduduk Antar Sensus, BPS — penduduk 2015 sebesar 255,5 juta jiwa." },
  { name: "Sakernas", desc: "Survei Angkatan Kerja Nasional, BPS — tingkat pengangguran terbuka (TPT) Februari 2024 sebesar 4,82%." },
  { name: "Susenas", desc: "Survei Sosial Ekonomi Nasional, BPS — kemiskinan Maret 2024 sebesar 9,03% dan rasio Gini 0,379." },
  { name: "SSGI 2024", desc: "Survei Status Gizi Indonesia, Kementerian Kesehatan — prevalensi stunting balita 19,8%." },
  { name: "Publikasi BPS", desc: "Pertumbuhan ekonomi, inflasi, IPM, dan pangsa sektor PDB — bps.go.id." },
];
