import { IMAGEN_POR_DEFECTO } from '../data/videojuegos.js';
import { formatearPrecio, urlPublica } from '../utils/format.js';

/* =========================================================
   TarjetaVideojuego: card de Bootstrap con la información
   de un videojuego (imagen, nombre, precio y descripción).
   Props:
   - juego: objeto con los datos del videojuego
   - nombreCategoria: nombre visible de su categoría
   ========================================================= */
function TarjetaVideojuego({ juego, nombreCategoria }) {
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
    </article>
  );
}

export default TarjetaVideojuego;
