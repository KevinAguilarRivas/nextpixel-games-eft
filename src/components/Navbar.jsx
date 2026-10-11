import { useRef } from 'react';
import { Collapse } from 'bootstrap';
import Logo from './Logo.jsx';

/* =========================================================
   Navbar: barra de navegación de Bootstrap 5 (navbar + collapse
   + dropdown). Permite moverse entre las secciones del sitio.
   Props:
   - categorias: objeto { id: nombre } para el menú desplegable
   - onSeleccionarCategoria: filtra el catálogo desde el menú
   ========================================================= */
function Navbar({ categorias, onSeleccionarCategoria }) {
  const menuRef = useRef(null);

  // En móvil, cierra el menú colapsable después de elegir un enlace
  const cerrarMenu = () => {
    const menu = menuRef.current;
    if (menu?.classList.contains('show')) {
      Collapse.getOrCreateInstance(menu).hide();
    }
  };

  const elegirCategoria = (event, categoriaId) => {
    event.preventDefault();
    onSeleccionarCategoria(categoriaId);
    cerrarMenu();
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg site-navbar" aria-label="Navegación principal">
        <div className="container">
          <Logo className="navbar-brand" />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
            aria-controls="menuPrincipal"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal" ref={menuRef}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
              <li className="nav-item">
                <a className="nav-link" href="#inicio" onClick={cerrarMenu}>Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#catalogo" onClick={cerrarMenu}>Catálogo</a>
              </li>

              {/* Dropdown de Bootstrap: cada opción filtra el catálogo por categoría */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#catalogo"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categorías
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="#catalogo" onClick={(e) => elegirCategoria(e, 'todas')}>
                      Todas
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  {Object.entries(categorias).map(([id, nombre]) => (
                    <li key={id}>
                      <a className="dropdown-item" href="#catalogo" onClick={(e) => elegirCategoria(e, id)}>
                        {nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#administrar" onClick={cerrarMenu}>Administrar</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto" onClick={cerrarMenu}>Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
