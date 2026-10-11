import { CATEGORIAS, VIDEOJUEGOS } from '../data/videojuegos.js';

// Retardo artificial para simular la latencia de una API externa
// y que el estado "Cargando…" alcance a verse en pantalla.
const RETARDO_SIMULADO_MS = 700;

/* =========================================================
   API simulada: entrega el catálogo de forma asíncrona.
   Devuelve una Promesa, igual que lo haría fetch() contra un
   servidor real. Se entregan copias para que React nunca
   modifique el objeto original del archivo de datos.
   ========================================================= */
export function obtenerVideojuegos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(VIDEOJUEGOS.map((juego) => ({ ...juego })));
    }, RETARDO_SIMULADO_MS);
  });
}

export function obtenerCategorias() {
  return { ...CATEGORIAS };
}
