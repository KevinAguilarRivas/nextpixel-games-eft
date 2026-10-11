import Logo from './Logo.jsx';

// Pie de página: datos de la tienda y enlaces rápidos
function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="site-footer pt-5 pb-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <Logo />
            <p className="mt-3 mb-0">
              Tienda de videojuegos online. Proyecto académico de Desarrollo Frontend I (PFY2201) — Duoc UC.
            </p>
          </div>
          <nav className="col-6 col-md-3" aria-label="Enlaces del pie de página">
            <h2 className="footer-title">Secciones</h2>
            <ul className="list-unstyled d-grid gap-1">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#administrar">Administrar</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>
          <address className="col-6 col-md-4 mb-0">
            <h2 className="footer-title">Contacto</h2>
            <p className="mb-1">contacto@nextpixelgames.cl</p>
            <p className="mb-1">+56 2 2345 6789</p>
            <p className="mb-0">Santiago, Chile</p>
          </address>
        </div>
        <hr />
        <p className="small text-center mb-0">© {anio} NextPixel Games · Kevin Aguilar</p>
      </div>
    </footer>
  );
}

export default Footer;
