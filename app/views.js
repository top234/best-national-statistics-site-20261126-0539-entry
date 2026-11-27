// views.js — satu fungsi render per halaman (hash route).
// Setiap render menulis HTML ke #view lalu memasang grafik canvas + kontrolnya.

import { KPIS, POPULATION, TOP_PROVINCES, AGE_STRUCTURE, DEMOGRAPHY, GDP_GROWTH, INFLATION, SECTORS, HDI, POVERTY, WELFARE, HEALTH_EDU, PROVINCES, SOURCES } from "./data.js";
import { lineChart, barChart, donutChart } from "./charts.js";
import { buildMap } from "./map.js";

function id(n, d) {
  return n.toFixed(d === undefined ? 1 : d).replace(".", ",").replace("-", "−");
}
function kpiCard(k) {
  return '<article class="kpi"><div class="k-label">' + k.label + '</div>' +
    '<div class="k-value">' + k.value + (k.unit ? " <small>" + k.unit + "</small>" : "") + "</div>" +
    '<div class="k-src">' + k.src + "</div></article>";
}
function srcLine(text) { return '<p class="src">Sumber: ' + text + "</p>"; }

// ---------- Beranda ----------
export function renderHome(el) {
  el.innerHTML =
    '<section class="hero">' +
      "<h1>Indonesia dalam angka: 281,6 juta jiwa, satu data.</h1>" +
      '<p class="lede">NusaData merangkum statistik nasional Indonesia — penduduk, ekonomi, provinsi, kesehatan, pendidikan, dan kesejahteraan — dari publikasi BPS, Sensus Penduduk 2020, Sakernas, dan Susenas.</p>' +
      '<div class="hero-big">' +
        '<div class="big"><b>281,6 jt</b><span>penduduk, pertengahan 2024</span></div>' +
        '<div class="big"><b>38</b><span>provinsi</span></div>' +
        '<div class="big"><b>5,03%</b><span>pertumbuhan ekonomi 2024</span></div>' +
        '<div class="big"><b>75,02</b><span>Indeks Pembangunan Manusia</span></div>' +
      "</div>" +
      '<div class="hero-cta"><a class="btn" href="#/penduduk">Lihat penduduk</a>' +
      '<a class="btn ghost" href="#/provinsi">Jelajahi 38 provinsi</a></div>' +
    "</section>" +
    '<div class="kpi-strip">' + KPIS.map(kpiCard).join("") + "</div>" +
    '<div class="grid-2">' +
      '<section class="card"><h2>Penduduk 1971–2024</h2>' +
        '<p class="stat-note">Juta jiwa. Penduduk naik lebih dari dua kali lipat dalam 53 tahun; laju tumbuhnya melambat.</p>' +
        '<canvas class="chart" id="ch-pop" height="260" aria-label="Grafik garis penduduk 1971 sampai 2024"></canvas>' +
        srcLine("Sensus Penduduk 1971–2020, SUPAS 2015, Proyeksi Penduduk 2024, BPS.") +
        '<p><a href="#/penduduk">Selengkapnya di halaman Penduduk →</a></p></section>' +
      '<section class="card"><h2>Lima provinsi terpadat</h2>' +
        '<p class="stat-note">Juta jiwa. Tiga provinsi di Jawa menampung lebih dari 125 juta jiwa — sekitar 46% penduduk Indonesia.</p>' +
        '<canvas class="chart" id="ch-top" aria-label="Bar chart lima provinsi terpadat"></canvas>' +
        srcLine("Sensus Penduduk 2020, BPS.") +
        '<p><a href="#/provinsi">Tabel 38 provinsi →</a></p></section>' +
    "</div>" +
    '<div class="grid-2">' +
      '<section class="card"><h2>Sorotan ekonomi</h2><ul class="spot-list">' +
        "<li><b>PDB tumbuh 5,03%</b> pada 2024 — konsumsi rumah tangga dan investasi penopang utama.<span class='tag'>Ekonomi</span></li>" +
        "<li><b>Inflasi 1,57%</b> pada Desember 2024 — terendah dalam satu dekade terakhir.<span class='tag'>Harga</span></li>" +
        "<li><b>Industri pengolahan</b> penyumbang PDB terbesar, sekitar 18,7%.<span class='tag'>Sektor</span></li>" +
      "</ul><p><a href='#/ekonomi'>Halaman Ekonomi →</a></p></section>" +
      '<section class="card"><h2>Sorotan kesejahteraan</h2><ul class="spot-list">' +
        "<li><b>Kemiskinan 9,03%</b> pada Maret 2024 — terendah sepanjang sejarah pencatatan.<span class='tag'>Kemiskinan</span></li>" +
        "<li><b>Pengangguran 4,82%</b> pada Februari 2024 — 7,20 juta orang.<span class='tag'>Tenaga kerja</span></li>" +
        "<li><b>IPM 75,02</b> pada 2024 — kategori tinggi, naik dari 69,55 pada 2015.<span class='tag'>Pembangunan</span></li>" +
      "</ul><p><a href='#/kesejahteraan'>Halaman Kesejahteraan →</a></p></section>" +
    "</div>";
  lineChart(el.querySelector("#ch-pop"), POPULATION, { unit: " jt", height: 260 });
  barChart(el.querySelector("#ch-top"), TOP_PROVINCES, { unit: " jt" });
}

// ---------- Penduduk ----------
export function renderPenduduk(el) {
  el.innerHTML =
    "<h1>Penduduk</h1>" +
    '<p class="page-intro">Dari 119,2 juta jiwa pada 1971 menjadi 281,6 juta pada 2024. Pertumbuhan melambat, dan mayoritas penduduk kini berada di usia produktif.</p>' +
    '<section class="card"><h2>Jumlah penduduk menurut tahun</h2>' +
      '<div class="controls" role="group" aria-label="Pilih rentang tahun">' +
        '<button class="seg-btn" data-range="all">1971–2024</button>' +
        '<button class="seg-btn" data-range="2000">2000–2024</button>' +
        '<button class="seg-btn" data-range="2010">2010–2024</button>' +
      "</div>" +
      '<canvas class="chart" id="ch-poprange" height="280" aria-label="Grafik garis penduduk pada rentang terpilih"></canvas>' +
      srcLine("Sensus Penduduk, SUPAS 2015, dan Proyeksi Penduduk 2024, BPS. Nilai 2024 adalah proyeksi pertengahan tahun.") +
    "</section>" +
    '<div class="grid-2">' +
      '<section class="card"><h2>Struktur umur 2020</h2>' +
        '<div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center">' +
          '<canvas id="ch-age" width="220" height="220" aria-label="Donat struktur umur 2020"></canvas>' +
          '<div class="legend" style="flex-direction:column;gap:8px">' +
            AGE_STRUCTURE.map((a) => '<span><i style="background:' + a.color + '"></i>' + a.label + " — " + id(a.value) + " jt (" + a.share + ")</span>").join("") +
          "</div>" +
        "</div>" +
        srcLine("Sensus Penduduk 2020, BPS.") + "</section>" +
      '<section class="card"><h2>Fakta demografi</h2><ul class="spot-list">' +
        DEMOGRAPHY.map((d) => "<li><b>" + d.label + ": " + d.value + "</b><br><span class='stat-note'>" + d.note + "</span></li>").join("") +
      "</ul></section>" +
    "</div>";
  const canvas = el.querySelector("#ch-poprange");
  const draw = (from) => lineChart(canvas, POPULATION.filter((p) => p.year >= from), { unit: " jt", height: 280 });
  const btns = Array.from(el.querySelectorAll(".seg-btn"));
  const activate = (btn) => {
    btns.forEach((b) => b.classList.toggle("on", b === btn));
    draw(Number(btn.dataset.range === "all" ? 1971 : btn.dataset.range));
  };
  btns.forEach((b) => {
    b.className = "seg-btn";
    b.addEventListener("click", () => activate(b));
  });
  // Bungkus tombol dalam seg agar tampil sebagai pemilih
  const group = el.querySelector(".controls");
  const seg = document.createElement("span");
  seg.className = "seg";
  btns.forEach((b) => seg.appendChild(b));
  group.appendChild(seg);
  activate(btns[0]);
  donutChart(el.querySelector("#ch-age"), AGE_STRUCTURE);
}

// ---------- Ekonomi ----------
export function renderEkonomi(el) {
  el.innerHTML =
    "<h1>Ekonomi</h1>" +
    '<p class="page-intro">Ekonomi Indonesia tumbuh sekitar 5% per tahun selama satu dekade terakhir, kecuali kontraksi −2,07% pada 2020 saat pandemi. Inflasi kembali rendah pada 2024.</p>' +
    '<div class="kpi-strip" style="grid-template-columns:repeat(3,1fr)">' +
      kpiCard({ label: "Pertumbuhan PDB 2024", value: "5,03", unit: "%", src: "BPS" }) +
      kpiCard({ label: "Inflasi Des 2024", value: "1,57", unit: "%", src: "BPS" }) +
      kpiCard({ label: "PDB per kapita 2024", value: "≈ Rp 78", unit: "jt/thn", src: "Perkiraan BPS" }) +
    "</div>" +
    '<section class="card"><h2>Pertumbuhan PDB 2015–2024</h2>' +
      '<p class="stat-note">Persen per tahun. Kontraksi 2020 adalah dampak pandemi COVID-19; pemulihan penuh tercapai pada 2022.</p>' +
      '<canvas class="chart" id="ch-gdp" height="260" aria-label="Grafik garis pertumbuhan PDB 2015 sampai 2024"></canvas>' +
      srcLine("BPS.") + "</section>" +
    '<div class="grid-2">' +
      '<section class="card"><h2>Inflasi tahunan 2015–2024</h2>' +
        '<p class="stat-note">Persen, year-on-year Desember. Lonjakan 2022 mengikuti kenaikan harga BBM bersubsidi.</p>' +
        '<canvas class="chart" id="ch-inf" height="240" aria-label="Grafik garis inflasi 2015 sampai 2024"></canvas>' +
        srcLine("BPS.") + "</section>" +
      '<section class="card"><h2>Pangsa sektor terhadap PDB 2024</h2>' +
        '<p class="stat-note">Persen. Industri pengolahan tetap penopang terbesar ekonomi Indonesia.</p>' +
        '<canvas class="chart" id="ch-sec" aria-label="Bar chart pangsa sektor PDB"></canvas>' +
        srcLine("Pangsa PDB 2024, BPS. Angka dibulatkan.") + "</section>" +
    "</div>" +
    '<section class="card"><h2>Catatan singkat</h2>' +
      "<p>Konsumsi rumah tangga menyumbang lebih dari separuh PDB dari sisi pengeluaran, disusul investasi (pembentukan modal tetap bruto) dan belanja pemerintah. Dari sisi lapangan usaha, lima sektor di atas menyumbang sekitar 63% PDB; sisanya tersebar di jasa keuangan, transportasi, informasi-komunikasi, kesehatan, pendidikan, dan jasa lainnya.</p>" +
      "<p>Pertumbuhan 5,03% pada 2024 dicapai di tengah inflasi yang rendah (1,57%) dan pengangguran yang menurun — kombinasi yang menjaga daya beli tetap tumbuh.</p></section>";
  lineChart(el.querySelector("#ch-gdp"), GDP_GROWTH, { unit: "%", decimals: 2, height: 260 });
  lineChart(el.querySelector("#ch-inf"), INFLATION, { unit: "%", decimals: 2, height: 240 });
  barChart(el.querySelector("#ch-sec"), SECTORS, { unit: "%" });
}

// ---------- Provinsi ----------
function fmtCell(v, suffix) {
  if (v === null || v === undefined) return '<td class="num miss">—</td>';
  return '<td class="num">' + (suffix === "%" ? "≈ " : suffix === "ipm" ? "≈ " : "") + id(v) + (suffix === "%" ? "%" : "") + "</td>";
}

export function renderProvinsi(el) {
  const state = { q: "", key: "pop", dir: -1, selected: "Jawa Barat", cmpA: "Jawa Barat", cmpB: "Jawa Timur" };
  el.innerHTML =
    "<h1>Provinsi</h1>" +
    '<p class="page-intro">38 provinsi, dari Aceh sampai Papua Barat Daya. Cari, urutkan, klik baris untuk detail, atau bandingkan dua provinsi. Angka penduduk dari Sensus 2020; IPM dan kemiskinan hanya ditampilkan bila diyakini — selebihnya “—”.</p>' +
    '<section class="card"><h2>Peta skematis Indonesia</h2>' +
      '<div class="map-box" id="map-box"></div>' +
      '<p class="map-note">Peta skematis — bentuk dan posisi pulau disederhanakan, bukan peta akurat. Titik amber: lima provinsi terpadat, klik untuk melihat detailnya.</p></section>' +
    '<section class="card"><h2>Tabel 38 provinsi</h2>' +
      '<div class="controls"><label class="f" for="q">Cari provinsi</label>' +
      '<input type="search" id="q" placeholder="mis. Jawa, Papua, Bali…" autocomplete="off">' +
      '<span class="hint" id="count"></span></div>' +
      '<div class="table-wrap"><table class="data" id="prov-table">' +
        "<thead><tr>" +
        '<th><button data-sort="name">Provinsi <span class="arr"></span></button></th>' +
        '<th class="num"><button data-sort="pop">Penduduk (jt) <span class="arr"></span></button></th>' +
        '<th class="num"><button data-sort="ipm">IPM <span class="arr"></span></button></th>' +
        '<th class="num"><button data-sort="poverty">Kemiskinan (%) <span class="arr"></span></button></th>' +
        "</tr></thead><tbody></tbody></table></div>" +
      '<p class="hint">Klik judul kolom untuk mengurutkan. Klik baris untuk detail. “—” berarti angka tidak ditampilkan karena tidak diyakini, bukan nol. Jumlah penduduk provinsi (dibulatkan) dapat berbeda dari total nasional 270,2 juta.</p>' +
      srcLine("Penduduk: Sensus Penduduk 2020, BPS. IPM 2024 dan kemiskinan Maret 2024: BPS (nilai pendekatan, ditandai ≈).") +
    "</section>" +
    '<section class="card detail" id="detail"></section>' +
    '<section class="card"><h2>Bandingkan dua provinsi</h2>' +
      '<div class="controls">' +
        '<label class="f" for="cmp-a">Provinsi A</label><select id="cmp-a"></select>' +
        '<label class="f" for="cmp-b">Provinsi B</label><select id="cmp-b"></select>' +
      "</div>" +
      '<div class="compare-grid" id="cmp-out"></div></section>';

  const tbody = el.querySelector("#prov-table tbody");
  const countEl = el.querySelector("#count");
  const detailEl = el.querySelector("#detail");

  function sortedRows() {
    const rows = PROVINCES.filter((p) => p.name.toLowerCase().includes(state.q));
    const k = state.key;
    rows.sort((a, b) => {
      const av = a[k], bv = b[k];
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      if (typeof av === "string") return state.dir * av.localeCompare(bv, "id");
      return state.dir * (av - bv);
    });
    return rows;
  }
  function drawTable() {
    const rows = sortedRows();
    countEl.textContent = rows.length + " dari 38 provinsi";
    tbody.innerHTML = rows.map((p) =>
      '<tr data-name="' + p.name + '" class="' + (p.name === state.selected ? "sel" : "") + '">' +
      "<td>" + p.name + "</td>" +
      '<td class="num">' + id(p.pop) + "</td>" +
      fmtCell(p.ipm, "ipm") + fmtCell(p.poverty, "%") +
      "</tr>").join("");
    el.querySelectorAll("#prov-table th .arr").forEach((s) => { s.textContent = ""; });
    const active = el.querySelector('[data-sort="' + state.key + '"] .arr');
    if (active) active.textContent = state.dir === 1 ? " ▲" : " ▼";
  }
  function drawDetail() {
    const p = PROVINCES.find((x) => x.name === state.selected) || PROVINCES[0];
    const gap = p.ipm === null && p.poverty === null;
    detailEl.innerHTML = "<h3>" + p.name + "</h3>" +
      '<div class="detail-grid">' +
      '<div class="dv"><b>' + id(p.pop) + " jt</b><span>Penduduk (Sensus 2020)</span></div>" +
      '<div class="dv"><b>' + (p.ipm === null ? "—" : "≈ " + id(p.ipm)) + '</b><span>IPM 2024, BPS</span></div>' +
      '<div class="dv"><b>' + (p.poverty === null ? "—" : "≈ " + id(p.poverty) + "%") + "</b><span>Kemiskinan, Mar 2024</span></div>" +
      "</div>" +
      (gap ? "<p class='hint' style='margin-top:10px'>IPM dan kemiskinan provinsi ini belum ditampilkan — angka yang ditampilkan di situs ini hanya yang diyakini.</p>"
        : "<p class='hint' style='margin-top:10px'>Tanda ≈ berarti nilai pendekatan yang dibulatkan.</p>");
  }
  function cmpCard(p, other, tag) {
    const bigger = p.pop > other.pop;
    return '<div class="vs-card"><h3>' + p.name + (bigger ? '<span class="vs-badge">lebih padat</span>' : "") + "</h3>" +
      '<div class="vs-row"><span>Penduduk (jt, 2020)</span><b>' + id(p.pop) + "</b></div>" +
      '<div class="vs-row"><span>IPM 2024</span><b>' + (p.ipm === null ? "—" : "≈ " + id(p.ipm)) + "</b></div>" +
      '<div class="vs-row"><span>Kemiskinan Mar 2024</span><b>' + (p.poverty === null ? "—" : "≈ " + id(p.poverty) + "%") + "</b></div>" +
      '<div class="vs-row"><span>Pangsa penduduk nasional</span><b>' + id((p.pop / 270.2) * 100) + "%</b></div>" +
      "</div>";
  }
  function drawCompare() {
    const a = PROVINCES.find((x) => x.name === state.cmpA);
    const b = PROVINCES.find((x) => x.name === state.cmpB);
    el.querySelector("#cmp-out").innerHTML = cmpCard(a, b) + cmpCard(b, a);
  }
  const selA = el.querySelector("#cmp-a"), selB = el.querySelector("#cmp-b");
  [selA, selB].forEach((s) => {
    s.innerHTML = PROVINCES.map((p) => '<option value="' + p.name + '">' + p.name + "</option>").join("");
  });
  selA.value = state.cmpA; selB.value = state.cmpB;
  selA.addEventListener("change", () => { state.cmpA = selA.value; drawCompare(); });
  selB.addEventListener("change", () => { state.cmpB = selB.value; drawCompare(); });

  el.querySelector("#q").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); drawTable(); });
  el.querySelectorAll("#prov-table th button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.sort;
      if (state.key === k) state.dir *= -1; else { state.key = k; state.dir = k === "name" ? 1 : -1; }
      drawTable();
    });
  });
  tbody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    state.selected = tr.dataset.name;
    drawTable(); drawDetail();
    detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  buildMap(el.querySelector("#map-box"), (name) => {
    state.selected = name;
    drawTable(); drawDetail();
    detailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  drawTable(); drawDetail(); drawCompare();
}

// ---------- Kesehatan & Pendidikan ----------
export function renderKesehatan(el) {
  el.innerHTML =
    "<h1>Kesehatan &amp; Pendidikan</h1>" +
    '<p class="page-intro">IPM Indonesia 75,02 pada 2024 — kategori tinggi. Harapan hidup sekitar 74 tahun, stunting turun ke 19,8%, dan anak Indonesia kini rata-rata menempuh 13,2 tahun sekolah.</p>' +
    '<div class="grid-3">' +
      '<article class="card"><div class="k-label">IPM 2024</div><div class="kpi-big">' + HEALTH_EDU.hdi.value + '</div><p class="stat-note">' + HEALTH_EDU.hdi.note + "</p></article>" +
      '<article class="card"><div class="k-label">Harapan hidup</div><div class="kpi-big">' + HEALTH_EDU.lifeExpectancy.value + '</div><p class="stat-note">' + HEALTH_EDU.lifeExpectancy.note + "</p></article>" +
      '<article class="card"><div class="k-label">Stunting balita</div><div class="kpi-big">' + HEALTH_EDU.stunting.value + '</div><p class="stat-note">' + HEALTH_EDU.stunting.note + "</p></article>" +
      '<article class="card"><div class="k-label">Rata-rata lama sekolah</div><div class="kpi-big">' + HEALTH_EDU.meanSchooling.value + '</div><p class="stat-note">' + HEALTH_EDU.meanSchooling.note + "</p></article>" +
      '<article class="card"><div class="k-label">Harapan lama sekolah</div><div class="kpi-big">' + HEALTH_EDU.expectedSchooling.value + '</div><p class="stat-note">' + HEALTH_EDU.expectedSchooling.note + "</p></article>" +
      '<article class="card"><div class="k-label">Melek huruf 15+</div><div class="kpi-big">' + HEALTH_EDU.literacy.value + '</div><p class="stat-note">' + HEALTH_EDU.literacy.note + "</p></article>" +
    "</div>" +
    '<section class="card"><h2>IPM 2015–2024: naik 5,47 poin dalam satu dekade</h2>' +
      '<p class="stat-note">Indeks Pembangunan Manusia menggabungkan kesehatan (harapan hidup), pendidikan (lama sekolah), dan standar hidup (pengeluaran per kapita).</p>' +
      '<canvas class="chart" id="ch-hdi" height="260" aria-label="Grafik garis IPM 2015 sampai 2024"></canvas>' +
      srcLine("BPS.") + "</section>" +
    '<section class="card"><h2>Yang berubah</h2><ul class="spot-list">' +
      "<li><b>Stunting 19,8%</b> (2024) — turun dari sekitar 24% pada 2021. Target pemerintah: di bawah 14% pada 2029.</li>" +
      "<li><b>Harapan lama sekolah 13,2 tahun</b> — anak yang masuk sekolah pada 2024 diperkirakan menempuh pendidikan hingga jenjang diploma.</li>" +
      "<li><b>IPM naik tiap tahun</b> sejak 2015 kecuali perlambatan pada 2020 saat pandemi; lompatan terbesar terjadi pada 2023.</li>" +
    "</ul></section>";
  lineChart(el.querySelector("#ch-hdi"), HDI, { decimals: 2, height: 260 });
}

// ---------- Kesejahteraan ----------
export function renderKesejahteraan(el) {
  el.innerHTML =
    "<h1>Kesejahteraan</h1>" +
    '<p class="page-intro">Kemiskinan 9,03% pada Maret 2024 — terendah sepanjang sejarah pencatatan BPS. Namun kesenjangan desa–kota masih lebar, dan pengangguran 4,82% berarti 7,20 juta orang tanpa pekerjaan.</p>' +
    '<div class="grid-3">' +
      '<article class="card"><div class="k-label">Tingkat kemiskinan</div><div class="kpi-big">' + WELFARE.poverty.value + '</div><p class="stat-note">' + WELFARE.poverty.note + "</p></article>" +
      '<article class="card"><div class="k-label">Garis kemiskinan</div><div class="kpi-big">' + WELFARE.povertyLine.value + '</div><p class="stat-note">' + WELFARE.povertyLine.note + "</p></article>" +
      '<article class="card"><div class="k-label">Pengangguran (TPT)</div><div class="kpi-big">' + WELFARE.unemployment.value + '</div><p class="stat-note">' + WELFARE.unemployment.note + "</p></article>" +
      '<article class="card"><div class="k-label">Rasio Gini</div><div class="kpi-big">' + WELFARE.gini.value + '</div><p class="stat-note">' + WELFARE.gini.note + "</p></article>" +
      '<article class="card"><div class="k-label">Kemiskinan perdesaan</div><div class="kpi-big">' + WELFARE.ruralPoverty.value + '</div><p class="stat-note">' + WELFARE.ruralPoverty.note + "</p></article>" +
      '<article class="card"><div class="k-label">Kemiskinan perkotaan</div><div class="kpi-big">' + WELFARE.urbanPoverty.value + '</div><p class="stat-note">' + WELFARE.urbanPoverty.note + "</p></article>" +
    "</div>" +
    '<div class="grid-2">' +
      '<section class="card"><h2>Kemiskinan 2015–2024</h2>' +
        '<p class="stat-note">Persen penduduk, Maret. Sempat naik pada 2020–2021 saat pandemi, lalu turun lagi hingga 9,03%.</p>' +
        '<canvas class="chart" id="ch-pov" height="260" aria-label="Grafik garis kemiskinan 2015 sampai 2024"></canvas>' +
        srcLine("BPS (Susenas).") + "</section>" +
      '<section class="card"><h2>Kesenjangan desa–kota</h2>' +
        '<p class="stat-note">Kemiskinan di perdesaan hampir 1,7 kali perkotaan. Garis kemiskinan desa lebih rendah karena biaya hidup lebih murah — namun peluang kerja dan layanan juga lebih terbatas.</p>' +
        '<canvas class="chart" id="ch-rural" aria-label="Bar chart kemiskinan desa dan kota"></canvas>' +
        srcLine("Maret 2024, perkiraan BPS.") + "</section>" +
    "</div>" +
    '<section class="card"><h2>Membaca angka ini</h2>' +
      "<p><b>Garis kemiskinan</b> adalah batas pengeluaran per kapita per bulan untuk memenuhi kebutuhan dasar makanan dan non-makanan. Seseorang di bawah garis itu dihitung miskin. <b>Rasio Gini 0,379</b> berarti ketimpangan pengeluaran berada di tingkat sedang — membaik dari 0,408 pada 2015, namun ketimpangan kekayaan jauh lebih tinggi dari ketimpangan pengeluaran.</p></section>";
  lineChart(el.querySelector("#ch-pov"), POVERTY, { unit: "%", decimals: 2, height: 260 });
  barChart(el.querySelector("#ch-rural"), [
    { name: "Perdesaan", value: 11.8 },
    { name: "Perkotaan", value: 7.1 },
  ], { unit: "%" });
}

// ---------- Sumber ----------
export function renderSumber(el) {
  el.innerHTML =
    "<h1>Sumber &amp; metodologi</h1>" +
    '<p class="page-intro">Semua angka di situs ini berasal dari publikasi resmi. NusaData bukan situs pemerintah dan tidak menggantikan publikasi BPS.</p>' +
    '<section class="card"><h2>Daftar sumber</h2><ul class="src-list">' +
      SOURCES.map((s) => "<li><b>" + s.name + "</b><br><span class='stat-note'>" + s.desc + "</span></li>").join("") +
    "</ul></section>" +
    '<section class="card"><h2>Catatan metodologi</h2>' +
      "<p><b>Sensus Penduduk</b> dilaksanakan tiap 10 tahun dan mencacah seluruh penduduk. <b>SUPAS</b> adalah survei antar-sensus. <b>Proyeksi Penduduk</b> menghitung penduduk pertengahan tahun dari hasil sensus terakhir dengan asumsi kelahiran, kematian, dan migrasi.</p>" +
      "<p><b>Sakernas</b> mengukur angkatan kerja dan pengangguran terbuka (TPT): penduduk yang tidak bekerja namun mencari pekerjaan. <b>Susenas</b> mengukur pengeluaran rumah tangga, dari situlah kemiskinan dan rasio Gini dihitung. <b>IPM</b> menggabungkan harapan hidup, lama sekolah, dan pengeluaran per kapita yang disesuaikan.</p>" +
      "<p><b>Pembulatan:</b> angka di situs ini dibulatkan ke satu desimal. Jumlah komponen yang dibulatkan dapat berbeda dari totalnya. Angka bertanda ≈ adalah nilai pendekatan. Sel yang berisi “—” berarti angka tersebut sengaja tidak ditampilkan karena tidak diyakini, bukan nol.</p>" +
      "<p>Untuk angka resmi lengkap dan terbaru, kunjungi <b>bps.go.id</b>.</p></section>";
}
