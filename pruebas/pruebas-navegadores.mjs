/* =========================================================
   Pruebas funcionales en navegadores reales (Chrome y Edge).
   Uso:  npm run build  &&  npm run test:navegadores
   - Levanta la versión de producción (/dist) con vite preview.
   - Recorre el sitio como un usuario: filtra, busca, agrega y
     elimina videojuegos, envía el formulario de contacto y
     revisa el diseño en escritorio, tablet y móvil.
   - Usa los navegadores ya instalados en el equipo (playwright-core
     no descarga navegadores). Si uno no está instalado, se omite.
   - Guarda capturas de pantalla en /capturas (las de Chrome).
   ========================================================= */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { preview } from 'vite';

const PUERTO = 4174;
const URL = `http://localhost:${PUERTO}/nextpixel-games-eft/`;
const OUT = process.argv[2] ?? 'capturas';
mkdirSync(OUT, { recursive: true });

const servidor = await preview({ preview: { port: PUERTO, strictPort: true } });

const resultados = [];
const check = (navegador, nombre, ok, detalle = '') => {
  resultados.push({ navegador, nombre, ok, detalle });
  console.log(`${ok ? 'OK  ' : 'FAIL'} [${navegador}] ${nombre}${detalle ? ' — ' + detalle : ''}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function correr(channel, conCapturas) {
  const nav = channel === 'msedge' ? 'Edge' : 'Chrome';
  const browser = await chromium.launch({ channel, headless: true });
  const shot = async (page, nombre, opts = {}) => {
    if (conCapturas) await page.screenshot({ path: `${OUT}/${nombre}.png`, ...opts });
  };

  // ---------- Escritorio ----------
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await ctx.newPage();
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  // Se ignoran los 404 de imágenes que aún no se han agregado a public/img/juegos
  page.on('console', (m) => m.type() === 'error' && !/Failed to load resource/.test(m.text()) && errores.push(m.text()));

  await page.goto(URL);
  await page.locator('#catalogo').scrollIntoViewIfNeeded();
  const spinner = await page.locator('.spinner-border').isVisible();
  check(nav, 'Muestra estado "Cargando videojuegos…"', spinner);
  await shot(page, '02-cargando-videojuegos');
  await page.waitForSelector('.game-card');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(300);
  await shot(page, '01-inicio-escritorio');

  const total = await page.locator('.game-card').count();
  check(nav, 'Genera 12 tarjetas desde el objeto JS', total === 12, `${total} tarjetas`);
  const espacios = await page.locator('.game-card .game-cover').count();
  check(nav, 'Cada tarjeta tiene su espacio para la imagen', espacios === total, `${espacios} espacios`);

  await page.evaluate(() => window.scrollTo(0, document.getElementById('catalogo').offsetTop - 70));
  await sleep(300);
  await shot(page, '03-catalogo-tarjetas');
  // Evidencia de compatibilidad: el mismo catálogo en Microsoft Edge
  if (channel === 'msedge') {
    await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
    await page.screenshot({ path: `${OUT}/15-edge-catalogo.png` });
  }

  // Filtro por botones
  await page.locator('.filtros-botones button', { hasText: 'RPG' }).click();
  const rpg = await page.locator('.game-card').count();
  check(nav, 'Filtro por categoría (botones): RPG', rpg === 3, `${rpg} juegos`);
  await shot(page, '04-filtro-categoria-rpg');

  // Filtro desde el dropdown de la navbar
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('.nav-link.dropdown-toggle').click();
  await sleep(300);
  await shot(page, '05-navbar-dropdown-categorias');
  await page.locator('.dropdown-item', { hasText: 'Carreras' }).click();
  await sleep(700);
  const carreras = await page.$$eval('.game-card h3', (h) => h.map((x) => x.textContent));
  check(nav, 'Filtro desde el dropdown de la Navbar: Carreras', carreras.length === 2, carreras.join(', '));

  // Búsqueda
  await page.locator('.filtros-botones button', { hasText: 'Todas' }).click();
  await page.fill('#buscarJuego', 'zelda');
  const zelda = await page.locator('.game-card').count();
  check(nav, 'Búsqueda por nombre "zelda"', zelda === 1);
  await page.fill('#buscarJuego', 'mario');
  const sinResultados = await page.locator('text=No hay videojuegos que coincidan').isVisible();
  check(nav, 'Mensaje de búsqueda sin resultados', sinResultados);
  await page.evaluate(() => window.scrollTo(0, document.getElementById('catalogo').offsetTop - 70));
  await shot(page, '06-busqueda-sin-resultados');
  await page.locator('.filtros-busqueda button', { hasText: 'Limpiar' }).click();

  // Administración: errores de validación
  await page.evaluate(() => window.scrollTo(0, document.getElementById('administrar').offsetTop - 70));
  await page.locator('#administrar button[type=submit]').click();
  const erroresAdmin = await page.locator('#administrar .invalid-feedback').count();
  check(nav, 'Formulario de videojuego valida campos vacíos', erroresAdmin === 5, `${erroresAdmin} errores`);
  await sleep(200);
  await shot(page, '07-agregar-juego-validacion');

  // Agregar videojuego
  await page.fill('#juego-nombre', 'Hades II');
  await page.selectOption('#juego-categoria', 'accion');
  await page.fill('#juego-plataforma', 'PC · Switch');
  await page.fill('#juego-precio', '24990');
  await page.fill('#juego-descripcion', 'Roguelike de acción en el inframundo griego.');
  await page.locator('#administrar button[type=submit]').click();
  await sleep(200);
  const tras = await page.locator('.game-card').count();
  const toast = await page.locator('.toast').textContent();
  check(nav, 'Agrega un videojuego al estado', tras === 13, toast);
  await shot(page, '08-juego-agregado-resumen');
  await page.evaluate(() => {
    const cards = document.querySelectorAll('.game-card');
    cards[cards.length - 1].scrollIntoView({ block: 'center' });
  });
  await sleep(300);
  await shot(page, '09-juego-agregado-en-catalogo');

  // Eliminar videojuego
  const card = page.locator('.game-card', { hasText: 'Hollow Knight' });
  await card.scrollIntoViewIfNeeded();
  await card.locator('button', { hasText: 'Eliminar' }).click();
  await sleep(150);
  await shot(page, '10-confirmar-eliminar');
  await card.locator('button', { hasText: 'Sí' }).click();
  await sleep(200);
  const trasEliminar = await page.locator('.game-card').count();
  const hollow = await page.locator('.game-card', { hasText: 'Hollow Knight' }).count();
  check(nav, 'Elimina un videojuego del estado', trasEliminar === 12 && hollow === 0);
  await shot(page, '11-juego-eliminado');

  // Contacto
  await page.evaluate(() => window.scrollTo(0, document.getElementById('contacto').offsetTop - 70));
  await page.locator('#contacto button[type=submit]').click();
  const erroresContacto = await page.locator('#contacto .invalid-feedback').count();
  check(nav, 'Contacto: valida campos vacíos', erroresContacto === 3);
  await page.fill('#contacto-nombre', 'Kevin123');
  await page.fill('#contacto-email', 'kevin@correo');
  await page.fill('#contacto-mensaje', 'Hola');
  const msgs = await page.$$eval('#contacto .invalid-feedback', (e) => e.map((x) => x.textContent));
  check(nav, 'Contacto: detecta datos mal ingresados', msgs.length === 3, msgs.join(' | '));
  await sleep(200);
  await shot(page, '12-contacto-errores');
  await page.fill('#contacto-nombre', 'Kevin Aguilar');
  await page.fill('#contacto-email', 'kevin@correo.cl');
  await page.fill('#contacto-mensaje', '¿Tienen stock de Elden Ring para PS5? Me interesa la edición física.');
  await page.locator('#contacto button[type=submit]').click();
  await sleep(200);
  const exito = await page.locator('#contacto .alert-success').isVisible();
  check(nav, 'Contacto: envía con datos válidos y limpia el formulario', exito && (await page.inputValue('#contacto-nombre')) === '');
  await shot(page, '13-contacto-enviado');

  // Restaurar catálogo
  await page.evaluate(() => window.scrollTo(0, document.getElementById('administrar').offsetTop - 70));
  await page.locator('button', { hasText: 'Restaurar catálogo original' }).click();
  await page.waitForSelector('.game-card');
  check(nav, 'Restaura el catálogo original', (await page.locator('.game-card').count()) === 12);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(300);
  await shot(page, '14-footer');

  const anchoOk = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  check(nav, 'Escritorio 1366px sin scroll horizontal', anchoOk);
  check(nav, 'Sin errores en la consola', errores.length === 0, errores.join(' | '));
  await ctx.close();

  // ---------- Tablet y móvil ----------
  for (const [nombre, viewport, extra] of [
    ['tablet', { width: 768, height: 1024 }, {}],
    ['movil', { width: 375, height: 812 }, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
  ]) {
    const c = await browser.newContext({ viewport, ...extra });
    const p = await c.newPage();
    await p.goto(URL);
    await p.waitForSelector('.game-card');
    await p.evaluate(() => document.fonts.ready);
    const sinScroll = await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    check(nav, `${nombre} ${viewport.width}px sin scroll horizontal`, sinScroll);

    if (nombre === 'movil') {
      await shot(p, '17-movil-inicio');
      await p.locator('.navbar-toggler').click();
      await sleep(500);
      check(nav, 'Móvil: abre el menú hamburguesa', await p.locator('#menuPrincipal.show').isVisible());
      await shot(p, '18-movil-menu');
      await p.locator('#menuPrincipal .nav-link', { hasText: 'Catálogo' }).click();
      await sleep(800);
      check(nav, 'Móvil: el menú se cierra al navegar', (await p.locator('#menuPrincipal.show').count()) === 0);
      check(nav, 'Móvil: filtro como menú desplegable', await p.locator('#filtroCategoria').isVisible());
      await p.selectOption('#filtroCategoria', 'aventura');
      await sleep(200);
      check(nav, 'Móvil: filtra con el select', (await p.locator('.game-card').count()) === 2);
      await p.evaluate(() => window.scrollTo(0, document.getElementById('catalogo').offsetTop - 70));
      await sleep(200);
      await shot(p, '19-movil-catalogo-filtrado');
      await p.evaluate(() => window.scrollTo(0, document.getElementById('contacto').offsetTop - 70));
      await p.locator('#contacto button[type=submit]').click();
      await sleep(200);
      await shot(p, '20-movil-contacto');
    } else {
      await p.evaluate(() => window.scrollTo(0, document.getElementById('catalogo').offsetTop - 70));
      await sleep(200);
      await shot(p, '16-tablet-catalogo');
    }
    await c.close();
  }

  await browser.close();
}

// Ejecuta las pruebas en cada navegador instalado (las capturas se toman con el primero)
let capturasTomadas = false;
for (const channel of ['chrome', 'msedge']) {
  try {
    await correr(channel, !capturasTomadas);
    capturasTomadas = true;
  } catch (err) {
    if (/executable doesn't exist|not found|Chromium distribution/i.test(err.message)) {
      console.log(`-- ${channel} no está instalado, se omite`);
    } else {
      throw err;
    }
  }
}

await servidor.close();

const fallas = resultados.filter((r) => !r.ok);
console.log(`
${resultados.length - fallas.length}/${resultados.length} pruebas OK`);
process.exit(fallas.length ? 1 : 0);
