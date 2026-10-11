import { urlPublica } from '../utils/format.js';

// Logo reutilizable: se usa en la barra de navegación y en el pie de página
function Logo({ className = '' }) {
  return (
    <a href="#inicio" className={`logo d-inline-flex align-items-center gap-2 text-decoration-none ${className}`}>
      <span className="logo-mark">
        <img src={urlPublica('img/helmet.png')} alt="" width="26" height="26" />
      </span>
      <span className="logo-text">
        NextPixel <em>Games</em>
      </span>
    </a>
  );
}

export default Logo;
