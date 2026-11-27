// charts.js — grafik canvas digambar sendiri, tanpa library.
// Semua fungsi menerima <canvas> dan menggambar dengan ketajaman devicePixelRatio.

const TEAL = "#0f4c4a";
const TEAL_DARK = "#0b3d3a";
const AMBER = "#f2a93b";
const GRID = "#e3ddd0";
const MUTED = "#5c6d6a";

function fmt(n, decimals) {
  return n.toFixed(decimals === undefined ? 1 : decimals).replace(".", ",").replace("-", "−");
}

function setupCanvas(canvas, cssHeight) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  const height = cssHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  return { ctx, width, height };
}

// Grafik garis dengan sumbu, grid, titik, dan label nilai.
export function lineChart(canvas, series, opts) {
  const o = opts || {};
  const decimals = o.decimals === undefined ? 1 : o.decimals;
  const h = o.height || 260;
  const { ctx, width, height } = setupCanvas(canvas, h);
  const padL = 46, padR = 14, padT = 16, padB = 30;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  const values = series.map((p) => p.value);
  let min = Math.min.apply(null, values), max = Math.max.apply(null, values);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min, pad = span * 0.15;
  min -= pad; max += pad;
  const x = (i) => padL + (series.length === 1 ? plotW / 2 : (i / (series.length - 1)) * plotW);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * plotH;

  ctx.font = "11px -apple-system, sans-serif";
  ctx.textAlign = "right"; ctx.textBaseline = "middle";
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const yy = y(v);
    ctx.strokeStyle = GRID; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, yy); ctx.lineTo(width - padR, yy); ctx.stroke();
    ctx.fillStyle = MUTED;
    ctx.fillText(fmt(v, decimals) + (o.unit || ""), padL - 8, yy);
  }
  // Area di bawah garis
  const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
  grad.addColorStop(0, "rgba(15,76,74,.18)");
  grad.addColorStop(1, "rgba(15,76,74,0)");
  ctx.beginPath();
  series.forEach((p, i) => { if (i === 0) ctx.moveTo(x(i), y(p.value)); else ctx.lineTo(x(i), y(p.value)); });
  ctx.lineTo(x(series.length - 1), padT + plotH); ctx.lineTo(x(0), padT + plotH); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
  // Garis
  ctx.beginPath();
  series.forEach((p, i) => { if (i === 0) ctx.moveTo(x(i), y(p.value)); else ctx.lineTo(x(i), y(p.value)); });
  ctx.strokeStyle = o.color || TEAL; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();
  // Garis nol bila ada nilai negatif
  if (min < 0 && max > 0) {
    ctx.strokeStyle = "#b3402e"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(padL, y(0)); ctx.lineTo(width - padR, y(0)); ctx.stroke();
    ctx.setLineDash([]);
  }
  // Titik + label tahun + label nilai
  ctx.textAlign = "center";
  series.forEach((p, i) => {
    ctx.beginPath(); ctx.arc(x(i), y(p.value), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; ctx.fill();
    ctx.strokeStyle = o.color || TEAL; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = MUTED; ctx.textBaseline = "top";
    ctx.fillText(String(p.year), x(i), height - 20);
    if (o.showValues !== false) {
      ctx.fillStyle = TEAL_DARK; ctx.font = "bold 11px -apple-system, sans-serif";
      ctx.textBaseline = "bottom";
      ctx.fillText(fmt(p.value, decimals) + (o.unit || ""), x(i), y(p.value) - 8);
      ctx.font = "11px -apple-system, sans-serif";
    }
  });
}

// Bar horizontal dengan label nilai di ujung bar.
export function barChart(canvas, items, opts) {
  const o = opts || {};
  const decimals = o.decimals === undefined ? 1 : o.decimals;
  const rowH = 34, h = items.length * rowH + 14;
  const { ctx, width, height } = setupCanvas(canvas, h);
  const padL = 150, padR = 64, padT = 8;
  const max = Math.max.apply(null, items.map((d) => d.value));
  ctx.font = "12px -apple-system, sans-serif";
  items.forEach((d, i) => {
    const yTop = padT + i * rowH;
    const barW = ((width - padL - padR) * d.value) / max;
    ctx.fillStyle = TEAL_DARK; ctx.textAlign = "right"; ctx.textBaseline = "middle";
    ctx.fillText(d.name, padL - 10, yTop + 12);
    ctx.fillStyle = d.color || TEAL;
    const r = 5;
    ctx.beginPath();
    ctx.roundRect(padL, yTop, Math.max(barW, 2), 24, r);
    ctx.fill();
    ctx.fillStyle = TEAL_DARK; ctx.textAlign = "left"; ctx.font = "bold 12px -apple-system, sans-serif";
    ctx.fillText(fmt(d.value, decimals) + (o.unit || ""), padL + barW + 8, yTop + 12);
    ctx.font = "12px -apple-system, sans-serif";
  });
  return height;
}

// Donat + legenda HTML di samping (legenda digambar pemanggil).
export function donutChart(canvas, segments) {
  const size = 220;
  const { ctx, width, height } = setupCanvas(canvas, size);
  const cx = width / 2, cy = height / 2, r = 82, inner = 54;
  const total = segments.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  ctx.font = "bold 12px -apple-system, sans-serif";
  segments.forEach((d) => {
    const sweep = (d.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.arc(cx, cy, inner, angle + sweep, angle, true);
    ctx.closePath();
    ctx.fillStyle = d.color; ctx.fill();
    const mid = angle + sweep / 2;
    const lx = cx + Math.cos(mid) * (r + 16), ly = cy + Math.sin(mid) * (r + 16);
    ctx.fillStyle = TEAL_DARK; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(d.share, lx, ly);
    angle += sweep;
  });
  ctx.fillStyle = TEAL_DARK; ctx.font = "bold 15px Georgia, serif";
  ctx.fillText("270,2 jt", cx, cy - 8);
  ctx.font = "11px -apple-system, sans-serif"; ctx.fillStyle = MUTED;
  ctx.fillText("penduduk 2020", cx, cy + 12);
}
