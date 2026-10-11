/* =========================================================
   Hero: portada del sitio con el mensaje principal y
   accesos directos al catálogo y al contacto.
   Props:
   - totalJuegos: cantidad de videojuegos disponibles
   ========================================================= */
function Hero({ totalJuegos }) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-titulo">
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="hero-eyebrow">Tienda online de videojuegos</p>
            <h1 id="hero-titulo" className="hero-title">
              Tu próxima partida <span>empieza aquí</span>
            </h1>
            <p className="hero-text">
              Los mejores lanzamientos y clásicos para PlayStation, Xbox, Nintendo Switch y PC, con
              despacho a todo Chile y códigos digitales al instante.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <a href="#catalogo" className="btn btn-primary btn-lg">Ver catálogo</a>
              <a href="#contacto" className="btn btn-outline-light btn-lg">Contáctanos</a>
            </div>
          </div>

          {/* Lista de beneficios organizada con CSS Grid */}
          <ul className="hero-stats list-unstyled mb-0">
            <li>
              <strong>{totalJuegos}</strong>
              <span>juegos disponibles</span>
            </li>
            <li>
              <strong>24 h</strong>
              <span>despacho en Santiago</span>
            </li>
            <li>
              <strong>4</strong>
              <span>plataformas</span>
            </li>
            <li>
              <strong>100%</strong>
              <span>juegos originales</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;
