// NusaData — penggambar grafik di atas <canvas>, tanpa pustaka luar.
// Semua fungsi menerima elemen canvas dan data berlabel; skala mengikuti
// rasio piksel perangkat agar garis dan teks tetap tajam.

const ChartPalette = {
  teal: "#0b5563",
  tealSoft: "#3d8a99",
  amber: "#e8a33d",
  rust: "#c65b39",
  green: "#4c956c",
  ink: "#40505a",
  grid: "#e3ddd0",
  donut: ["#0b5563", "#e8a33d", "#4c956c", "#c65b39", "#3d8a99", "#8a6fb8", "#b8a24a", "#7a8b99", "#d9d3c3"],
};

function setupCanvas(canvas, cssHeight) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.height = cssHeight + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width, height: cssHeight };
}

function niceCeil(value) {
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const unit = value / pow;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];
  const step = steps.find((s) => unit <= s) || 10;
  return step * pow;
}

function formatTick(value) {
  return String(Math.round(value * 10) / 10).replace(".", ",");
}

// Grafik garis untuk seri tahunan: points = [{year, value}].
function drawLineChart(canvas, points, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const pad = { left: 44, right: 14, top: 14, bottom: 28 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const values = points.map((p) => p.value);
  let min = Math.min(0, Math.min(...values));
  let max = niceCeil(Math.max(...values) * 1.05);
  if (options.min !== undefined) min = options.min;
  if (options.max !== undefined) max = options.max;
  const x = (i) => pad.left + (plotW * i) / (points.length - 1);
  const y = (v) => pad.top + plotH - ((v - min) / (max - min)) * plotH;

  ctx.font = "11px system-ui, sans-serif";
  ctx.strokeStyle = ChartPalette.grid;
  ctx.fillStyle = ChartPalette.ink;
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    const gy = y(gv);
    ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(width - pad.right, gy); ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(formatTick(gv), pad.left - 6, gy + 4);
  }
  if (min < 0) {
    ctx.strokeStyle = ChartPalette.ink;
    ctx.beginPath(); ctx.moveTo(pad.left, y(0)); ctx.lineTo(width - pad.right, y(0)); ctx.stroke();
  }
  ctx.textAlign = "center";
  points.forEach((p, i) => {
    if (points.length > 8 && i % 2 === 1 && i !== points.length - 1) return;
    ctx.fillText(String(p.year), x(i), height - 8);
  });

  ctx.beginPath();
  points.forEach((p, i) => { if (i === 0) ctx.moveTo(x(i), y(p.value)); else ctx.lineTo(x(i), y(p.value)); });
  ctx.strokeStyle = options.color || ChartPalette.teal;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.lineTo(x(points.length - 1), y(min)); ctx.lineTo(x(0), y(min)); ctx.closePath();
  ctx.fillStyle = (options.color || ChartPalette.teal) + "22";
  ctx.fill();

  ctx.fillStyle = options.color || ChartPalette.teal;
  points.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(x(i), y(p.value), 3.2, 0, Math.PI * 2); ctx.fill();
  });
  const last = points[points.length - 1];
  ctx.font = "bold 12px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillStyle = ChartPalette.ink;
  ctx.fillText(formatTick(last.value) + (options.unit || ""), x(points.length - 1), y(last.value) - 10);
}

// Grafik batang vertikal; nilai negatif digambar ke bawah sumbu nol dengan warna berbeda.
function drawBarChart(canvas, points, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 240);
  const pad = { left: 40, right: 10, top: 16, bottom: 28 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const values = points.map((p) => p.value);
  const max = niceCeil(Math.max(...values) * 1.08);
  const min = Math.min(0, Math.min(...values));
  const y = (v) => pad.top + ((max - v) / (max - min)) * plotH;
  const slot = plotW / points.length;
  const barW = Math.min(38, slot * 0.58);

  ctx.font = "11px system-ui, sans-serif";
  ctx.strokeStyle = ChartPalette.grid;
  ctx.fillStyle = ChartPalette.ink;
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    ctx.beginPath(); ctx.moveTo(pad.left, y(gv)); ctx.lineTo(width - pad.right, y(gv)); ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(formatTick(gv), pad.left - 6, y(gv) + 4);
  }
  ctx.strokeStyle = ChartPalette.ink;
  ctx.beginPath(); ctx.moveTo(pad.left, y(0)); ctx.lineTo(width - pad.right, y(0)); ctx.stroke();

  points.forEach((p, i) => {
    const cx = pad.left + slot * i + slot / 2;
    ctx.fillStyle = p.value < 0 ? ChartPalette.rust : (options.color || ChartPalette.teal);
    const top = y(Math.max(p.value, 0));
    const bottom = y(Math.min(p.value, 0));
    ctx.fillRect(cx - barW / 2, top, barW, Math.max(2, bottom - top));
    ctx.fillStyle = ChartPalette.ink;
    ctx.textAlign = "center";
    ctx.font = "bold 10.5px system-ui, sans-serif";
    ctx.fillText(formatTick(p.value), cx, (p.value < 0 ? bottom + 14 : top - 5));
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillText(String(p.year), cx, height - 8);
  });
}

// Batang horizontal terurut untuk peringkat (mis. provinsi terpadat penduduknya).
function drawRankBars(canvas, rows, options) {
  const rowH = 27;
  const { ctx, width, height } = setupCanvas(canvas, rows.length * rowH + 8);
  const labelW = Math.min(150, width * 0.34);
  const max = rows[0].value;
  ctx.font = "12px system-ui, sans-serif";
  rows.forEach((row, i) => {
    const top = 4 + i * rowH;
    ctx.fillStyle = ChartPalette.ink;
    ctx.textAlign = "left";
    ctx.fillText(row.name, 0, top + 16, labelW - 8);
    const barW = ((width - labelW - 64) * row.value) / max;
    ctx.fillStyle = i === 0 ? ChartPalette.amber : ChartPalette.teal;
    ctx.fillRect(labelW, top + 4, Math.max(3, barW), 15);
    ctx.fillStyle = ChartPalette.ink;
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.fillText(formatTick(row.value) + (options.unit || ""), labelW + Math.max(3, barW) + 7, top + 16);
    ctx.font = "12px system-ui, sans-serif";
  });
  return height;
}

// Donat sederhana dengan legenda digambar sebagai teks di samping kanan.
function drawDonut(canvas, parts, options) {
  const { ctx, width, height } = setupCanvas(canvas, options.height || 230);
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const radius = Math.min(height / 2 - 12, 96);
  const cx = radius + 14;
  const cy = height / 2;
  let angle = -Math.PI / 2;
  parts.forEach((p, i) => {
    const sweep = (p.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = ChartPalette.donut[i % ChartPalette.donut.length];
    ctx.fill();
    angle += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.fillStyle = ChartPalette.ink;
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(options.center || "", cx, cy + 4);

  const legendX = cx + radius + 22;
  ctx.textAlign = "left";
  parts.forEach((p, i) => {
    const ly = cy - ((parts.length - 1) * 21) / 2 + i * 21;
    ctx.fillStyle = ChartPalette.donut[i % ChartPalette.donut.length];
    ctx.fillRect(legendX, ly - 9, 11, 11);
    ctx.fillStyle = ChartPalette.ink;
    ctx.font = "12px system-ui, sans-serif";
    const share = Math.round((p.value / total) * 1000) / 10;
    ctx.fillText(p.label + " — " + formatTick(p.value) + (options.unit || "") + " (" + formatTick(share) + "%)", legendX + 17, ly + 2, width - legendX - 17);
  });
}
