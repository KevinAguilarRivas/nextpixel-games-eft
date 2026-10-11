import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Bootstrap 5: primero sus estilos y su JS (navbar colapsable, toasts),
// después nuestros estilos para poder personalizarlo
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/styles.css';

import App from './App.jsx';

// Punto de entrada: monta el componente raíz <App /> en el div#root de index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
