import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Footer from './components/Footer.jsx';
import { obtenerCategorias } from './services/api.js';

const categorias = obtenerCategorias();

/* =========================================================
   App: componente raíz. Arma la estructura semántica del sitio
   (header > nav, main > section, footer).
   ========================================================= */
function App() {
  return (
    <>
      <Navbar categorias={categorias} onSeleccionarCategoria={() => {}} />

      <main>
        <Hero totalJuegos={12} />

        <section className="section" id="catalogo" aria-labelledby="catalogo-titulo">
          <div className="container">
            <div className="section-head">
              <h2 id="catalogo-titulo">Catálogo de videojuegos</h2>
              <p>Próximamente: listado de videojuegos.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
