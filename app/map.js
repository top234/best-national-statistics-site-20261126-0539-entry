// map.js — peta skematis Indonesia sebagai SVG yang digambar sendiri.
// Bentuk dan posisi pulau disederhanakan; BUKAN peta akurat dan tidak diklaim akurat.
// Titik amber menandai lima provinsi terpadat; klik titik memilih provinsi itu.

const ISLANDS = [
  { name: "Sumatera", d: "M78 42 L104 30 L138 66 L168 112 L196 162 L218 212 L236 256 L252 292 L226 304 L202 262 L172 212 L142 162 L112 112 L86 78 Z" },
  { name: "Jawa", d: "M296 296 L330 286 L470 282 L620 288 L664 296 L648 312 L480 314 L322 312 Z" },
  { name: "Kalimantan", d: "M436 108 L476 78 L534 72 L574 98 L592 140 L578 192 L542 218 L484 216 L444 190 L424 150 Z" },
  { name: "Sulawesi", d: "M648 118 L676 100 L700 108 L692 138 L712 150 L742 138 L760 152 L734 172 L716 196 L724 236 L726 268 L700 268 L694 224 L668 196 L644 172 L636 142 Z" },
  { name: "Papua", d: "M786 128 L836 106 L896 112 L938 132 L952 168 L930 200 L888 216 L838 214 L800 196 L782 164 Z" },
  { name: "Bali", d: "M668 330 L686 326 L692 336 L676 342 Z" },
  { name: "Nusa Tenggara", d: "M700 332 L736 328 L782 330 L830 336 L852 344 L830 352 L772 348 L716 344 Z" },
  { name: "Maluku", d: "M700 210 L716 206 L722 218 L706 224 Z M742 236 L756 232 L760 244 L746 248 Z" },
];

const MARKERS = [
  { name: "Sumatera Utara", x: 168, y: 138 },
  { name: "Banten", x: 352, y: 299 },
  { name: "Jawa Barat", x: 428, y: 299 },
  { name: "Jawa Tengah", x: 502, y: 298 },
  { name: "Jawa Timur", x: 584, y: 299 },
];

export function buildMap(container, onSelect) {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 960 400");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Peta skematis Indonesia dengan lima provinsi terpadat");

  const defs = document.createElementNS(NS, "defs");
  const pat = document.createElementNS(NS, "pattern");
  pat.setAttribute("id", "dots");
  pat.setAttribute("width", "10");
  pat.setAttribute("height", "10");
  pat.setAttribute("patternUnits", "userSpaceOnUse");
  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("cx", "2"); dot.setAttribute("cy", "2"); dot.setAttribute("r", "1.4");
  dot.setAttribute("fill", "rgba(255,255,255,.35)");
  pat.appendChild(dot);
  defs.appendChild(pat);
  svg.appendChild(defs);

  const sea = document.createElementNS(NS, "rect");
  sea.setAttribute("x", "0"); sea.setAttribute("y", "0");
  sea.setAttribute("width", "960"); sea.setAttribute("height", "400");
  sea.setAttribute("rx", "10"); sea.setAttribute("fill", "#dcebe8");
  svg.appendChild(sea);

  ISLANDS.forEach((isl) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", isl.d);
    p.setAttribute("fill", "#0f4c4a");
    p.setAttribute("stroke", "#ffffff");
    p.setAttribute("stroke-width", "2");
    const t = document.createElementNS(NS, "title");
    t.textContent = isl.name;
    p.appendChild(t);
    svg.appendChild(p);
    const over = document.createElementNS(NS, "path");
    over.setAttribute("d", isl.d);
    over.setAttribute("fill", "url(#dots)");
    svg.appendChild(over);
  });

  const labels = [
    { text: "SUMATERA", x: 105, y: 195, fill: "#0b3d3a" },
    { text: "KALIMANTAN", x: 500, y: 150, fill: "rgba(255,255,255,.9)" },
    { text: "SULAWESI", x: 695, y: 292, fill: "#0b3d3a" },
    { text: "JAWA", x: 480, y: 342, fill: "#0b3d3a" },
    { text: "PAPUA", x: 860, y: 165, fill: "rgba(255,255,255,.9)" },
  ];
  labels.forEach((l) => {
    const t = document.createElementNS(NS, "text");
    t.setAttribute("x", l.x); t.setAttribute("y", l.y);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", l.fill);
    t.setAttribute("font-size", "13");
    t.setAttribute("font-weight", "700");
    t.setAttribute("letter-spacing", "2");
    t.textContent = l.text;
    svg.appendChild(t);
  });

  MARKERS.forEach((m) => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "map-dot");
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", m.x); c.setAttribute("cy", m.y); c.setAttribute("r", "7");
    const t = document.createElementNS(NS, "title");
    t.textContent = m.name + " — klik untuk detail";
    g.appendChild(c); g.appendChild(t);
    const label = document.createElementNS(NS, "text");
    label.setAttribute("x", m.x); label.setAttribute("y", m.y - 12);
    label.setAttribute("text-anchor", "middle");
    label.textContent = m.name;
    g.appendChild(label);
    g.addEventListener("click", () => { if (onSelect) onSelect(m.name); });
    svg.appendChild(g);
  });

  container.appendChild(svg);
}
