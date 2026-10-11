/* =========================================================
   Utilidades reutilizables (funciones puras, sin estado)
   ========================================================= */

// Da formato de precio chileno a un número, ej: 39990 -> "$39.990"
export function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CL');
}

// Convierte una ruta relativa de /public en una ruta válida también en GitHub Pages.
// import.meta.env.BASE_URL vale "/" en desarrollo y "/nextpixel-games-eft/" en producción.
// Si la ruta ya es una URL completa (http/https/data) se devuelve tal cual.
export function urlPublica(ruta) {
  if (/^(https?:|data:)/.test(ruta)) return ruta;
  return import.meta.env.BASE_URL + ruta;
}
