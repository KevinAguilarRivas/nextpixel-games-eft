import FormularioContacto from './FormularioContacto.jsx';

/* =========================================================
   Contacto: sección con los datos de la tienda y el
   formulario para comunicarse con el administrador.
   Props:
   - onEnviado: se pasa al formulario (lo maneja App)
   ========================================================= */
function Contacto({ onEnviado }) {
  return (
    <section className="section" id="contacto" aria-labelledby="contacto-titulo">
      <div className="container">
        <div className="section-head">
          <h2 id="contacto-titulo">Contacto</h2>
          <p>¿Dudas sobre un pedido o buscas un juego que no está en el catálogo? Escríbenos.</p>
        </div>

        <div className="contacto-grid">
          <aside className="contacto-info">
            <div className="card panel-card h-100">
              <div className="card-body p-4">
                <h3 className="h5 mb-3">Atención al cliente</h3>
                <dl className="mb-0">
                  <dt>Correo</dt>
                  <dd>contacto@nextpixelgames.cl</dd>
                  <dt>Teléfono</dt>
                  <dd>+56 2 2345 6789</dd>
                  <dt>Horario</dt>
                  <dd>Lunes a viernes, 9:00 a 18:00</dd>
                  <dt>Tienda física</dt>
                  <dd className="mb-0">Av. Providencia 1234, Santiago</dd>
                </dl>
              </div>
            </div>
          </aside>

          <FormularioContacto onEnviado={onEnviado} />
        </div>
      </div>
    </section>
  );
}

export default Contacto;
