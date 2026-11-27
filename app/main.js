// main.js — router hash + boot NusaData. Satu-satunya modul yang dimuat index.html.

import { renderHome, renderPenduduk, renderEkonomi, renderProvinsi, renderKesehatan, renderKesejahteraan, renderSumber } from "./views.js";

const ROUTES = {
  "": { title: "NusaData — Statistik Indonesia", render: renderHome },
  "penduduk": { title: "Penduduk — NusaData", render: renderPenduduk },
  "ekonomi": { title: "Ekonomi — NusaData", render: renderEkonomi },
  "provinsi": { title: "Provinsi — NusaData", render: renderProvinsi },
  "kesehatan": { title: "Kesehatan & Pendidikan — NusaData", render: renderKesehatan },
  "kesejahteraan": { title: "Kesejahteraan — NusaData", render: renderKesejahteraan },
  "sumber": { title: "Sumber — NusaData", render: renderSumber },
};

const view = document.getElementById("view");
const navLinks = Array.from(document.querySelectorAll(".mainnav a"));

function currentRoute() {
  const hash = window.location.hash || "#/";
  return hash.replace(/^#\/?/, "").split("/")[0];
}

function route() {
  const key = ROUTES[currentRoute()] ? currentRoute() : "";
  const page = ROUTES[key];
  document.title = page.title;
  navLinks.forEach((a) => a.classList.toggle("active", (a.dataset.route || "") === key));
  page.render(view);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
