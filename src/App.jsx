import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FiltroCategorias from './components/FiltroCategorias.jsx';
import ListaVideojuegos from './components/ListaVideojuegos.jsx';
import Footer from './components/Footer.jsx';
import { useVideojuegos } from './hooks/useVideojuegos.js';
import { obtenerCategorias } from './services/api.js';

const categorias = obtenerCategorias();

/* =========================================================
   App: componente raíz. Arma la estructura semántica del sitio
   (header > nav, main > section, footer) y guarda el estado
   compartido, que reparte a los hijos mediante props.
   ========================================================= */
function App() {
  // Estado del catálogo: se carga con useEffect dentro del hook
  const { videojuegos, cargando, error, recargar } = useVideojuegos();

  // Estado de los filtros (lo comparten Navbar, FiltroCategorias y ListaVideojuegos)
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  // Lista filtrada: se deriva del estado en cada render (no necesita su propio useState)
  const texto = busqueda.trim().toLowerCase();
  const videojuegosFiltrados = videojuegos.filter((juego) => {
    const coincideCategoria = categoriaActiva === 'todas' || juego.categoria === categoriaActiva;
    const coincideTexto = texto === '' || juego.nombre.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });

  // Cantidad de juegos por categoría para mostrar en los filtros
  const conteos = videojuegos.reduce(
    (acc, juego) => ({ ...acc, [juego.categoria]: (acc[juego.categoria] ?? 0) + 1 }),
    { todas: videojuegos.length }
  );

  // Desde el menú de la Navbar: filtra y lleva al usuario al catálogo
  const irACategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar categorias={categorias} onSeleccionarCategoria={irACategoria} />

      <main>
        <Hero totalJuegos={videojuegos.length} />

        <section className="section" id="catalogo" aria-labelledby="catalogo-titulo">
          <div className="container">
            <div className="section-head">
              <h2 id="catalogo-titulo">Catálogo de videojuegos</h2>
              <p>Lanzamientos y clásicos seleccionados por el equipo NextPixel.</p>
            </div>

            <FiltroCategorias
              categorias={categorias}
              conteos={conteos}
              categoriaActiva={categoriaActiva}
              onCambiarCategoria={setCategoriaActiva}
              busqueda={busqueda}
              onCambiarBusqueda={setBusqueda}
            />

            <ListaVideojuegos
              videojuegos={videojuegosFiltrados}
              categorias={categorias}
              cargando={cargando}
              error={error}
              onReintentar={recargar}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
