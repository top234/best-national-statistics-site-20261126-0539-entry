// NusaData — tampilan tiap halaman. Setiap view mengembalikan HTML dan
// fungsi mount yang menggambar grafik serta menghidupkan kontrolnya.

function kpiCards(items) {
  return items.map((k) =>
    '<article class="kpi"><p class="kpi-label">' + k.label + '</p>' +
    '<p class="kpi-value">' + k.value + '</p>' +
    '<p class="kpi-note">' + k.note + "</p></article>"
  ).join("");
}

function factList(items) {
  return items.map((f) =>
    '<div class="fact"><p class="fact-value">' + f.value + '</p>' +
    '<p class="fact-label">' + f.label + '</p>' +
    '<p class="fact-note">' + f.note + "</p></div>"
  ).join("");
}

function panel(title, sourceNote, canvasId, extra) {
  return '<section class="panel"><div class="panel-head"><h3>' + title + "</h3>" +
    '<p class="panel-source">' + sourceNote + "</p></div>" +
    (extra || "") + '<canvas id="' + canvasId + '" class="chart"></canvas></section>';
}

const Views = {

  home: {
    html() {
      const top5 = NUSADATA.provinces2020.slice().sort((a, b) => b.value - a.value).slice(0, 5);
      return (
        '<section class="hero"><h2>Indonesia dalam angka yang bisa dipercaya</h2>' +
        "<p>NusaData merangkum statistik resmi Indonesia — penduduk, ekonomi, provinsi, kesehatan, dan pendidikan — " +
        "dengan sumber dan tahun yang jelas di setiap angka. Semua halaman bisa dijelajahi dari tautan di atas.</p></section>" +
        '<section class="kpi-grid">' + kpiCards(NUSADATA.headline) + "</section>" +
        '<div class="two-col">' +
        panel("Penduduk Indonesia, 1971–2024 (juta jiwa)", "Sensus Penduduk & Proyeksi BPS", "home-pop") +
        '<section class="panel"><div class="panel-head"><h3>Lima provinsi terpadat</h3>' +
        '<p class="panel-source">Sensus Penduduk 2020 · juta jiwa</p></div>' +
        '<canvas id="home-top5" class="chart"></canvas>' +
        '<p class="panel-foot">Tiga provinsi di Jawa menampung 151,5 juta jiwa — 56% penduduk Indonesia. ' +
        '<a href="#/provinsi">Lihat semua provinsi →</a></p></section></div>' +
        '<section class="panel"><div class="panel-head"><h3>Jelajahi statistik</h3></div><div class="link-cards">' +
        '<a class="link-card" href="#/penduduk"><strong>Penduduk</strong><span>270,20 juta jiwa pada SP2020, struktur umur, dan proyeksi 2024.</span></a>' +
        '<a class="link-card" href="#/ekonomi"><strong>Ekonomi</strong><span>Pertumbuhan PDB, inflasi, perdagangan, dan kemiskinan.</span></a>' +
        '<a class="link-card" href="#/provinsi"><strong>Provinsi</strong><span>Penduduk 34 provinsi hasil SP2020, bisa dicari dan diurutkan.</span></a>' +
        '<a class="link-card" href="#/sejahtera"><strong>Kesehatan &amp; Pendidikan</strong><span>IPM, stunting, umur harapan hidup, dan lama sekolah.</span></a>' +
        "</div></section>"
      );
    },
    mount() {
      drawLineChart(document.getElementById("home-pop"), NUSADATA.populationSeries, { unit: " jt" });
      const top5 = NUSADATA.provinces2020.slice().sort((a, b) => b.value - a.value).slice(0, 5);
      drawRankBars(document.getElementById("home-top5"), top5, { unit: " jt" });
    },
  },

  penduduk: {
    html() {
      return (
        '<section class="page-head"><h2>Penduduk</h2>' +
        "<p>Sensus Penduduk 2020 mencatat <strong>270.203.917 jiwa</strong>. Indonesia adalah negara berpenduduk " +
        "terbanyak keempat di dunia, dan pertumbuhannya melambat: laju pertumbuhan 2010–2020 sebesar 1,25% per tahun, " +
        "turun dari 1,49% pada dekade sebelumnya. Pilih rentang tahun untuk memperbesar grafik.</p></section>" +
        panel("Jumlah penduduk menurut sensus & proyeksi (juta jiwa)", "BPS — Sensus Penduduk 1971–2020, SUPAS 2015, Proyeksi 2024", "pop-line",
          '<div class="controls"><label>Rentang: <select id="pop-range">' +
          '<option value="all">1971–2024</option><option value="recent">2000–2024</option></select></label></div>') +
        '<div class="two-col">' +
        panel("Struktur umur penduduk 2020", "SP2020 · juta jiwa", "pop-age") +
        '<section class="panel"><div class="panel-head"><h3>Fakta demografi</h3>' +
        '<p class="panel-source">Sensus Penduduk 2020 & Long Form SP2020</p></div>' +
        '<div class="fact-grid">' + factList(NUSADATA.demographyFacts) + "</div></section></div>" +
        '<section class="panel prose"><h3>Membaca angka penduduk</h3>' +
        "<p>Bonus demografi sedang berlangsung: 70,7% penduduk berada pada usia produktif (15–64 tahun), sehingga rasio " +
        "ketergantungan hanya 41,9 — terendah dalam sejarah Indonesia. Jendela ini diperkirakan menutup sekitar 2035, " +
        "ketika penduduk lanjut usia bertambah cepat. Urbanisasi terus naik: 56,6% penduduk tinggal di perkotaan pada 2020, " +
        "dan proyeksi BPS menempatkan angka pertengahan 2024 pada 281,6 juta jiwa.</p></section>"
      );
    },
    mount() {
      const canvas = document.getElementById("pop-line");
      const draw = () => {
        const range = document.getElementById("pop-range").value;
        const points = range === "recent" ? NUSADATA.populationSeries.filter((p) => p.year >= 2000) : NUSADATA.populationSeries;
        drawLineChart(canvas, points, { unit: " jt" });
      };
      document.getElementById("pop-range").addEventListener("change", draw);
      draw();
      drawDonut(document.getElementById("pop-age"),
        NUSADATA.ageStructure2020.map((a) => ({ label: a.group, value: a.value })),
        { unit: " jt", center: "270,2 jt" });
    },
  },

  ekonomi: {
    html() {
      return (
        '<section class="page-head"><h2>Ekonomi</h2>' +
        "<p>Ekonomi Indonesia tumbuh 5,03% pada 2024 — melanjutkan pemulihan penuh dari kontraksi pandemi 2020 (−2,07%). " +
        "Inflasi terjaga di 1,57%, dan kemiskinan turun ke titik terendah di luar masa pandemi.</p></section>" +
        '<div class="fact-strip">' + factList(NUSADATA.economyFacts) + "</div>" +
        '<div class="two-col">' +
        panel("Pertumbuhan PDB tahunan (%)", "BPS — Produk Domestik Bruto", "eco-growth") +
        panel("Inflasi tahunan, Desember (%)", "BPS — Indeks Harga Konsumen", "eco-inflation") +
        "</div>" +
        '<div class="two-col">' +
        panel("Struktur PDB menurut lapangan usaha 2023", "BPS · persen, dibulatkan", "eco-structure") +
        panel("Pengangguran terbuka, Februari (%)", "Sakernas BPS", "eco-unemployment") +
        "</div>" +
        panel("Penduduk miskin, Maret (%)", "Susenas BPS — garis kemiskinan nasional", "eco-poverty") +
        '<section class="panel prose"><h3>Apa artinya bagi warga</h3>' +
        "<p>Pertumbuhan di kisaran 5% dengan inflasi di bawah 2% berarti daya beli membaik pada 2024. Tantangan utamanya " +
        "adalah kualitas pekerjaan: pengangguran terbuka turun ke 4,82%, tetapi lebih dari separuh pekerja masih berada " +
        "di sektor informal. Kemiskinan turun ke 9,03% pada Maret 2024 — 25,22 juta jiwa — dan pemerintah menargetkan " +
        "kemiskinan ekstrem mendekati nol.</p></section>"
      );
    },
    mount() {
      drawBarChart(document.getElementById("eco-growth"), NUSADATA.gdpGrowth, {});
      drawLineChart(document.getElementById("eco-inflation"), NUSADATA.inflation, { color: ChartPalette.rust, unit: "%" });
      drawDonut(document.getElementById("eco-structure"),
        NUSADATA.gdpStructure2023.map((s) => ({ label: s.sector, value: s.value })),
        { unit: "%", center: "PDB 2023" });
      drawLineChart(document.getElementById("eco-unemployment"), NUSADATA.unemploymentFeb, { color: ChartPalette.green, unit: "%" });
      drawLineChart(document.getElementById("eco-poverty"), NUSADATA.povertyMarch, { color: ChartPalette.amber, unit: "%" });
    },
  },

  provinsi: {
    html() {
      return (
        '<section class="page-head"><h2>Provinsi</h2>' +
        "<p>Penduduk 34 provinsi hasil Sensus Penduduk 2020 (sebelum pemekaran Papua menjadi enam provinsi). " +
        "Cari nama provinsi, atau urutkan tabelnya; grafik menampilkan sepuluh provinsi terpadat.</p></section>" +
        panel("Sepuluh provinsi terpadat (juta jiwa)", "Sensus Penduduk 2020", "prov-top10") +
        '<section class="panel"><div class="panel-head"><h3>Semua provinsi</h3>' +
        '<p class="panel-source">SP2020 · total nasional 270,20 juta jiwa</p></div>' +
        '<div class="controls"><label>Cari: <input id="prov-search" type="search" placeholder="nama provinsi…"></label>' +
        '<label>Urutkan: <select id="prov-sort">' +
        '<option value="desc">Penduduk terbanyak</option><option value="asc">Penduduk tersedikit</option>' +
        '<option value="name">Nama A–Z</option></select></label>' +
        '<span id="prov-count" class="count-note"></span></div>' +
        '<div class="table-wrap"><table class="data-table"><thead><tr>' +
        "<th>Provinsi</th><th>Penduduk (juta)</th><th>Porsi dari nasional</th>" +
        '</tr></thead><tbody id="prov-body"></tbody></table></div></section>'
      );
    },
    mount() {
      const top10 = NUSADATA.provinces2020.slice().sort((a, b) => b.value - a.value).slice(0, 10);
      drawRankBars(document.getElementById("prov-top10"), top10, { unit: " jt" });
      const body = document.getElementById("prov-body");
      const count = document.getElementById("prov-count");
      const render = () => {
        const query = document.getElementById("prov-search").value.trim().toLowerCase();
        const sort = document.getElementById("prov-sort").value;
        let rows = NUSADATA.provinces2020.filter((p) => p.name.toLowerCase().includes(query));
        rows = rows.slice().sort((a, b) =>
          sort === "name" ? a.name.localeCompare(b.name) : sort === "asc" ? a.value - b.value : b.value - a.value);
        body.innerHTML = rows.map((p) => {
          const share = (p.value / 270.2) * 100;
          return "<tr><td>" + p.name + "</td><td class='num'>" + formatTick(p.value) + "</td>" +
            "<td><span class='share-bar' style='width:" + Math.max(2, share * 3) + "px'></span>" + formatTick(Math.round(share * 10) / 10) + "%</td></tr>";
        }).join("");
        count.textContent = rows.length + " dari 34 provinsi";
      };
      document.getElementById("prov-search").addEventListener("input", render);
      document.getElementById("prov-sort").addEventListener("change", render);
      render();
    },
  },

  sejahtera: {
    html() {
      return (
        '<section class="page-head"><h2>Kesehatan &amp; Pendidikan</h2>' +
        "<p>IPM Indonesia mencapai 75,02 pada 2024 — kategori tinggi. Umur harapan hidup naik ke 73,9 tahun dan " +
        "stunting turun hampir separuhnya dalam lima tahun, tetapi rata-rata lama sekolah baru 8,77 tahun: " +
        "rata-rata warga dewasa tamat SMP kelas tiga.</p></section>" +
        '<div class="two-col">' +
        panel("Indeks Pembangunan Manusia", "BPS — skala 0–100", "wel-hdi") +
        panel("Stunting balita (%)", "SSGI 2019–2022 & SKI 2023, Kemenkes", "wel-stunting") +
        "</div>" +
        '<div class="two-col">' +
        panel("Rata-rata lama sekolah (tahun)", "BPS — penduduk 25 tahun ke atas", "wel-school") +
        '<section class="panel"><div class="panel-head"><h3>Indikator lain</h3>' +
        '<p class="panel-source">BPS & Kemenkes</p></div>' +
        '<div class="fact-grid">' + factList(NUSADATA.wellbeingFacts) + "</div></section></div>" +
        '<section class="panel prose"><h3>Cara memakai angka ini</h3>' +
        "<p>Untuk keluarga: stunting yang turun ke 21,5% berarti program gizi bekerja, tetapi satu dari lima balita " +
        "masih mengalaminya — posyandu setempat adalah pintu pertama intervensi. Untuk pelajar dan orang tua: harapan " +
        "lama sekolah 13,13 tahun menunjukkan anak yang masuk SD hari ini berpeluang menamatkan SMA dan mulai kuliah; " +
        "mengejar rata-rata lama sekolah di atas 9 tahun adalah syarat Indonesia keluar dari jebakan pendapatan menengah.</p></section>"
      );
    },
    mount() {
      drawLineChart(document.getElementById("wel-hdi"), NUSADATA.hdi, { min: 65, unit: "" });
      drawBarChart(document.getElementById("wel-stunting"), NUSADATA.stunting, { color: ChartPalette.rust });
      drawLineChart(document.getElementById("wel-school"), NUSADATA.schoolingYears, { color: ChartPalette.green, min: 7, unit: " th" });
    },
  },

  sumber: {
    html() {
      const rows = NUSADATA.sources.map((s) =>
        '<article class="source-item"><h3>' + s.name + '</h3><p class="source-by">' + s.by + "</p><p>" + s.detail + "</p></article>"
      ).join("");
      return (
        '<section class="page-head"><h2>Sumber &amp; Metode</h2>' +
        "<p>NusaData tidak mengadakan survei sendiri. Semua angka berasal dari publikasi statistik resmi yang tercantum " +
        "di bawah ini, dan setiap grafik menyebut sumber serta tahunnya. Angka dibulatkan untuk tampilan; nilai resmi " +
        "yang mengikat adalah yang terbit di publikasi sumbernya (bps.go.id dan kemkes.go.id).</p></section>" +
        '<section class="panel"><div class="source-list">' + rows + "</div></section>" +
        '<section class="panel prose"><h3>Catatan pembacaan</h3>' +
        "<p>Sensus Penduduk 2020 memakai 34 provinsi; Papua kemudian dimekarkan menjadi enam provinsi sehingga Indonesia " +
        "kini memiliki 38 provinsi. Seri kemiskinan dan pengangguran adalah potret Maret dan Februari pada tahunnya. " +
        "Umur harapan hidup 2023 memakai metode baru berbasis Long Form SP2020, sehingga tidak sepenuhnya sebanding " +
        "dengan seri lama. Situs ini karya independen untuk menjelajahi statistik publik, bukan situs resmi BPS.</p></section>"
      );
    },
    mount() {},
  },
};
