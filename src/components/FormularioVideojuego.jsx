import CampoFormulario from './CampoFormulario.jsx';
import { useFormulario } from '../hooks/useFormulario.js';
import { validarVideojuego } from '../utils/validaciones.js';

const VALORES_INICIALES = {
  nombre: '',
  categoria: '',
  plataforma: '',
  precio: '',
  descripcion: '',
  imagen: '',
};

/* =========================================================
   FormularioVideojuego: permite agregar un videojuego nuevo
   al catálogo. Valida los datos antes de enviarlos al padre.
   Props:
   - categorias: objeto { id: nombre } para el <select>
   - nombresExistentes: evita agregar juegos repetidos
   - onAgregar: función del padre que actualiza el estado de la lista
   ========================================================= */
function FormularioVideojuego({ categorias, nombresExistentes, onAgregar }) {
  const { valores, errores, mostrarError, manejarCambio, manejarBlur, manejarSubmit, reiniciar } = useFormulario(
    VALORES_INICIALES,
    (datos) => validarVideojuego(datos, categorias, nombresExistentes)
  );

  const agregar = (datos) => {
    onAgregar({
      nombre: datos.nombre.trim(),
      categoria: datos.categoria,
      plataforma: datos.plataforma.trim(),
      precio: Number(datos.precio),
      descripcion: datos.descripcion.trim(),
      imagen: datos.imagen.trim(),
    });
    reiniciar();
  };

  // Props comunes a todos los campos (el id lleva prefijo para no repetirse con el formulario de contacto)
  const campo = (nombreCampo) => ({
    id: `juego-${nombreCampo}`,
    name: nombreCampo,
    value: valores[nombreCampo],
    onChange: manejarCambio,
    onBlur: manejarBlur,
    error: errores[nombreCampo],
    mostrarError: mostrarError(nombreCampo),
  });

  return (
    <form className="card panel-card" onSubmit={manejarSubmit(agregar)} noValidate>
      <div className="card-body p-4">
        <h3 className="h5 mb-3">Agregar videojuego</h3>

        <div className="row g-3">
          <CampoFormulario {...campo('nombre')} label="Nombre" placeholder="Ej: Hades II" className="col-12 col-md-6" />

          <CampoFormulario {...campo('categoria')} tipo="select" label="Categoría" className="col-12 col-md-6">
            <option value="">Selecciona…</option>
            {Object.entries(categorias).map(([id, nombre]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
          </CampoFormulario>

          <CampoFormulario
            {...campo('plataforma')}
            label="Plataformas"
            placeholder="Ej: PS5 · PC"
            className="col-12 col-md-6"
          />

          <CampoFormulario
            {...campo('precio')}
            tipo="number"
            label="Precio (CLP)"
            placeholder="Ej: 29990"
            min="1000"
            max="500000"
            step="1"
            inputMode="numeric"
            className="col-12 col-md-6"
          />

          <CampoFormulario
            {...campo('descripcion')}
            tipo="textarea"
            label="Descripción"
            rows="3"
            placeholder="Una frase que resuma el juego"
            className="col-12"
          />

          <CampoFormulario
            {...campo('imagen')}
            tipo="url"
            label="URL de la portada (opcional)"
            placeholder="https://…"
            ayuda="Si lo dejas vacío se usará una portada genérica."
            className="col-12"
          />
        </div>

        <div className="d-flex flex-wrap gap-2 mt-4">
          <button type="submit" className="btn btn-primary">
            Agregar al catálogo
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={reiniciar}>
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormularioVideojuego;
