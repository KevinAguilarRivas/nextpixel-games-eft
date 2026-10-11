import FormularioVideojuego from './FormularioVideojuego.jsx';

/* =========================================================
   PanelAdministracion: sección para gestionar el catálogo.
   Agrupa el formulario para agregar videojuegos y un resumen
   con la opción de restaurar el catálogo original.
   Props:
   - categorias, videojuegos
   - onAgregar, onRestaurar: acciones que modifican el estado en App
   ========================================================= */
function PanelAdministracion({ categorias, videojuegos, onAgregar, onRestaurar }) {
  const nombres = videojuegos.map((juego) => juego.nombre);
  const valorTotal = videojuegos.reduce((total, juego) => total + juego.precio, 0);

  return (
    <section className="section section-alt" id="administrar" aria-labelledby="administrar-titulo">
      <div className="container">
        <div className="section-head">
          <h2 id="administrar-titulo">Administrar catálogo</h2>
          <p>Agrega nuevos videojuegos o elimínalos desde el botón “Eliminar” de cada tarjeta.</p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <FormularioVideojuego categorias={categorias} nombresExistentes={nombres} onAgregar={onAgregar} />
          </div>

          <aside className="col-12 col-lg-4">
            <div className="card panel-card h-100">
              <div className="card-body p-4 d-flex flex-column">
                <h3 className="h5 mb-3">Resumen</h3>
                <ul className="list-group list-group-flush mb-4">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Videojuegos</span>
                    <strong>{videojuegos.length}</strong>
                  </li>
                  {Object.entries(categorias).map(([id, nombre]) => (
                    <li key={id} className="list-group-item d-flex justify-content-between">
                      <span>{nombre}</span>
                      <span>{videojuegos.filter((juego) => juego.categoria === id).length}</span>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Valor del catálogo</span>
                    <strong>${valorTotal.toLocaleString('es-CL')}</strong>
                  </li>
                </ul>
                <button type="button" className="btn btn-outline-warning mt-auto" onClick={onRestaurar}>
                  Restaurar catálogo original
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default PanelAdministracion;
