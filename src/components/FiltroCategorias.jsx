/* =========================================================
   FiltroCategorias: filtra el catálogo por categoría y nombre.
   - En pantallas medianas y grandes: botones de Bootstrap.
   - En móvil: menú desplegable (<select>) que ocupa menos espacio.
   El filtro no guarda estado propio: recibe el valor actual por
   props y avisa los cambios al componente padre (App).
   Props:
   - categorias: objeto { id: nombre }
   - conteos: cantidad de juegos por categoría { id: número, todas: número }
   - categoriaActiva, onCambiarCategoria
   - busqueda, onCambiarBusqueda
   ========================================================= */
function FiltroCategorias({ categorias, conteos, categoriaActiva, onCambiarCategoria, busqueda, onCambiarBusqueda }) {
  const opciones = [['todas', 'Todas'], ...Object.entries(categorias)];

  return (
    <div className="filtros mb-4">
      {/* Botones: visibles desde md (≥768px) */}
      <div className="filtros-botones d-none d-md-flex" role="group" aria-label="Filtrar por categoría">
        {opciones.map(([id, nombre]) => {
          const activa = categoriaActiva === id;
          return (
            <button
              key={id}
              type="button"
              className={`btn btn-sm rounded-pill ${activa ? 'btn-primary' : 'btn-outline-secondary'}`}
              aria-pressed={activa}
              onClick={() => onCambiarCategoria(id)}
            >
              {nombre} <span className="badge text-bg-dark ms-1">{conteos[id] ?? 0}</span>
            </button>
          );
        })}
      </div>

      <div className="filtros-campos">
        {/* Menú desplegable: solo en móvil (<768px) */}
        <div className="d-md-none">
          <label htmlFor="filtroCategoria" className="form-label small">Categoría</label>
          <select
            id="filtroCategoria"
            className="form-select"
            value={categoriaActiva}
            onChange={(event) => onCambiarCategoria(event.target.value)}
          >
            {opciones.map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre} ({conteos[id] ?? 0})
              </option>
            ))}
          </select>
        </div>

        <div className="filtros-busqueda">
          <label htmlFor="buscarJuego" className="form-label small">Buscar por nombre</label>
          <div className="input-group">
            <input
              type="search"
              id="buscarJuego"
              className="form-control"
              placeholder="Ej: Zelda"
              value={busqueda}
              onChange={(event) => onCambiarBusqueda(event.target.value)}
            />
            {/* Renderizado condicional: el botón solo aparece si hay texto */}
            {busqueda && (
              <button type="button" className="btn btn-outline-secondary" onClick={() => onCambiarBusqueda('')}>
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltroCategorias;
