import { useState } from 'react';
import { IMAGEN_POR_DEFECTO } from '../data/videojuegos.js';
import { formatearPrecio, urlPublica } from '../utils/format.js';

/* =========================================================
   TarjetaVideojuego: card de Bootstrap con la información
   de un videojuego (imagen, nombre, precio y descripción).
   Props:
   - juego: objeto con los datos del videojuego
   - nombreCategoria: nombre visible de su categoría
   - onEliminar: quita el juego del estado de la lista (en App)
   ========================================================= */
function TarjetaVideojuego({ juego, nombreCategoria, onEliminar }) {
  // Estado local: pide confirmación antes de eliminar
  const [confirmando, setConfirmando] = useState(false);

  // Si la imagen no existe o falla, se reemplaza por la portada por defecto
  const usarImagenPorDefecto = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = urlPublica(IMAGEN_POR_DEFECTO);
  };

  return (
    <article className="card game-card h-100">
      <div className="game-cover">
        <img
          src={urlPublica(juego.imagen || IMAGEN_POR_DEFECTO)}
          className="card-img-top"
          alt={`Portada de ${juego.nombre}`}
          loading="lazy"
          onError={usarImagenPorDefecto}
        />
        <span className="badge game-badge">{nombreCategoria}</span>
      </div>

      <div className="card-body d-flex flex-column">
        <p className="game-platform mb-1">{juego.plataforma}</p>
        <h3 className="card-title h5">{juego.nombre}</h3>
        <p className="card-text flex-grow-1">{juego.descripcion}</p>
        <p className="game-price mb-0">{formatearPrecio(juego.precio)}</p>
      </div>

      <div className="card-footer game-actions">
        {/* Renderizado condicional: botón normal o confirmación */}
        {confirmando ? (
          <div className="d-flex align-items-center gap-2 w-100" role="group" aria-label="Confirmar eliminación">
            <span className="small me-auto">¿Eliminar?</span>
            <button type="button" className="btn btn-sm btn-danger" onClick={() => onEliminar(juego)}>
              Sí
            </button>
            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => setConfirmando(false)}>
              No
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger w-100"
            onClick={() => setConfirmando(true)}
            aria-label={`Eliminar ${juego.nombre} del catálogo`}
          >
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default TarjetaVideojuego;
