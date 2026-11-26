// NusaData — perute hash dan perender utama.
// Rute: #/ beranda, #/penduduk, #/ekonomi, #/provinsi, #/sejahtera, #/sumber.

const Routes = {
  "/": Views.home,
  "/penduduk": Views.penduduk,
  "/ekonomi": Views.ekonomi,
  "/provinsi": Views.provinsi,
  "/sejahtera": Views.sejahtera,
  "/sumber": Views.sumber,
};

let currentMount = null;
let resizeTimer = null;

function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return Routes[hash] ? hash : "/";
}

function render() {
  const path = currentPath();
  const view = Routes[path];
  const main = document.getElementById("app");
  main.innerHTML = view.html();
  currentMount = view.mount;
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + path);
  });
  window.scrollTo(0, 0);
  currentMount();
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (currentMount) currentMount(); }, 180);
});

render();
