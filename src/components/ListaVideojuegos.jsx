import TarjetaVideojuego from './TarjetaVideojuego.jsx';

/* =========================================================
   ListaVideojuegos: genera dinámicamente una tarjeta por cada
   videojuego recorriendo el arreglo con .map().
   Renderizado condicional según el estado:
   cargando → error → sin resultados → grilla de tarjetas.
   Props:
   - videojuegos: lista (ya filtrada) a mostrar
   - categorias: objeto { id: nombre }
   - cargando, error, onReintentar: estado de la carga
   - onEliminar: se pasa a cada tarjeta para quitar un juego
   ========================================================= */
function ListaVideojuegos({ videojuegos, categorias, cargando, error, onReintentar, onEliminar }) {
  if (cargando) {
    return (
      <div className="estado-catalogo" role="status">
        <div className="spinner-border text-info" aria-hidden="true"></div>
        <p className="mb-0">Cargando videojuegos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center gap-3" role="alert">
        <span className="flex-grow-1">{error}</span>
        <button type="button" className="btn btn-outline-light" onClick={onReintentar}>
          Reintentar
        </button>
      </div>
    );
  }

  if (videojuegos.length === 0) {
    return (
      <div className="estado-catalogo">
        <p className="mb-0">No hay videojuegos que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <>
      <p className="catalogo-conteo" aria-live="polite">
        Mostrando {videojuegos.length} {videojuegos.length === 1 ? 'videojuego' : 'videojuegos'}
      </p>

      {/* Grilla responsiva de Bootstrap: 1 columna en móvil, 2–3 en tablet, 4 en escritorio */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {videojuegos.map((juego) => (
          <div className="col" key={juego.id}>
            <TarjetaVideojuego
              juego={juego}
              nombreCategoria={categorias[juego.categoria] ?? juego.categoria}
              onEliminar={onEliminar}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ListaVideojuegos;
