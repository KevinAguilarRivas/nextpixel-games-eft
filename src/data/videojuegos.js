/* =========================================================
   Datos de la tienda (objeto JavaScript)
   - CATEGORIAS: diccionario id → nombre visible de cada categoría
   - VIDEOJUEGOS: arreglo de objetos, uno por videojuego, con
     nombre, categoría, precio, descripción e imagen.
   Las imágenes van en public/img/juegos/ con el nombre indicado
   en "imagen". Si el archivo no existe, la tarjeta muestra el
   espacio de la portada vacío.
   Esta es la "base de datos" del sitio: la API simulada
   (services/api.js) la entrega de forma asíncrona a React.
   ========================================================= */

export const CATEGORIAS = {
  accion: 'Acción',
  aventura: 'Aventura',
  rpg: 'RPG',
  deportes: 'Deportes',
  carreras: 'Carreras',
  estrategia: 'Estrategia',
};

export const VIDEOJUEGOS = [
  {
    id: 1,
    nombre: 'Elden Ring',
    categoria: 'rpg',
    plataforma: 'PS5 · Xbox · PC',
    precio: 39990,
    descripcion: 'Explora las Tierras Intermedias en un mundo abierto lleno de jefes desafiantes y secretos.',
    imagen: 'img/juegos/elden-ring.avif',
  },
  {
    id: 2,
    nombre: "Baldur's Gate 3",
    categoria: 'rpg',
    plataforma: 'PS5 · PC',
    precio: 49990,
    descripcion: 'RPG por turnos basado en Dungeons & Dragons donde cada decisión cambia la historia.',
    imagen: 'img/juegos/baldurs-gate-3.jpg',
  },
  {
    id: 3,
    nombre: 'The Witcher 3: Wild Hunt',
    categoria: 'rpg',
    plataforma: 'PS5 · Xbox · PC · Switch',
    precio: 19990,
    descripcion: 'Edición completa con todas las expansiones: sigue a Geralt en la búsqueda de Ciri.',
    imagen: 'img/juegos/the-witcher-3.avif',
  },
  {
    id: 4,
    nombre: 'God of War Ragnarök',
    categoria: 'accion',
    plataforma: 'PS5 · PC',
    precio: 54990,
    descripcion: 'Kratos y Atreus recorren los nueve reinos en el desenlace de la saga nórdica.',
    imagen: 'img/juegos/god-of-war-ragnarok.jpeg',
  },
  {
    id: 5,
    nombre: "Marvel's Spider-Man 2",
    categoria: 'accion',
    plataforma: 'PS5',
    precio: 59990,
    descripcion: 'Peter Parker y Miles Morales unen fuerzas contra Venom en una Nueva York más grande.',
    imagen: 'img/juegos/spider-man-2.avif',
  },
  {
    id: 6,
    nombre: 'Zelda: Tears of the Kingdom',
    categoria: 'aventura',
    plataforma: 'Nintendo Switch',
    precio: 59990,
    descripcion: 'Link explora el cielo, la superficie y las profundidades de Hyrule construyendo sus propias máquinas.',
    imagen: 'img/juegos/zelda-totk.avif',
  },
  {
    id: 7,
    nombre: 'Hollow Knight',
    categoria: 'aventura',
    plataforma: 'PS4 · Xbox · PC · Switch',
    precio: 14990,
    descripcion: 'Metroidvania dibujado a mano: recorre el reino subterráneo de Hallownest.',
    imagen: 'img/juegos/hollow-knight.jpg',
  },
  {
    id: 8,
    nombre: 'EA Sports FC 26',
    categoria: 'deportes',
    plataforma: 'PS5 · Xbox · PC',
    precio: 64990,
    descripcion: 'El fútbol más realista con ligas licenciadas, Ultimate Team y modo carrera.',
    imagen: 'img/juegos/ea-sports-fc-26.jpg',
  },
  {
    id: 9,
    nombre: 'NBA 2K26',
    categoria: 'deportes',
    plataforma: 'PS5 · Xbox · PC',
    precio: 59990,
    descripcion: 'Básquetbol con jugabilidad renovada, MyCAREER y las plantillas oficiales de la NBA.',
    imagen: 'img/juegos/nba-2k26.webp',
  },
  {
    id: 10,
    nombre: 'Forza Horizon 5',
    categoria: 'carreras',
    plataforma: 'PS5 · Xbox · PC',
    precio: 39990,
    descripcion: 'Festival de carreras en mundo abierto por los paisajes de México con cientos de autos.',
    imagen: 'img/juegos/forza-horizon-5.avif',
  },
  {
    id: 11,
    nombre: 'Gran Turismo 7',
    categoria: 'carreras',
    plataforma: 'PS5 · PS4',
    precio: 44990,
    descripcion: 'El simulador de conducción definitivo con circuitos reales y física detallada.',
    imagen: 'img/juegos/gran-turismo-7.jpg',
  },
  {
    id: 12,
    nombre: 'Age of Empires IV',
    categoria: 'estrategia',
    plataforma: 'PC · Xbox',
    precio: 29990,
    descripcion: 'Estrategia en tiempo real: lidera civilizaciones históricas en batallas épicas.',
    imagen: 'img/juegos/age-of-empires-4.avif',
  },
];
