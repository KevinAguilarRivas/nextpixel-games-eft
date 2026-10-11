import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
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

  return (
    <>
      <Navbar categorias={categorias} onSeleccionarCategoria={() => {}} />

      <main>
        <Hero totalJuegos={videojuegos.length} />

        <section className="section" id="catalogo" aria-labelledby="catalogo-titulo">
          <div className="container">
            <div className="section-head">
              <h2 id="catalogo-titulo">Catálogo de videojuegos</h2>
              <p>Lanzamientos y clásicos seleccionados por el equipo NextPixel.</p>
            </div>

            <ListaVideojuegos
              videojuegos={videojuegos}
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
