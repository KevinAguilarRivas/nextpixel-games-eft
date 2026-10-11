import { useCallback, useEffect, useState } from 'react';
import { obtenerVideojuegos } from '../services/api.js';

/* =========================================================
   Hook personalizado: maneja la lista de videojuegos.
   - useState guarda la lista, el estado de carga y el error.
   - useEffect carga los datos desde la API simulada al montar.
   ========================================================= */
export function useVideojuegos() {
  const [videojuegos, setVideojuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carga (o vuelve a cargar) el catálogo original desde la API
  const cargar = useCallback(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    obtenerVideojuegos()
      .then((datos) => {
        if (!cancelado) setVideojuegos(datos);
      })
      .catch((err) => {
        console.error('Error al cargar el catálogo:', err);
        if (!cancelado) setError('No pudimos cargar los videojuegos. Inténtalo nuevamente.');
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    // Permite ignorar la respuesta si el componente se desmonta antes
    return () => {
      cancelado = true;
    };
  }, []);

  // Efecto: carga el catálogo una sola vez al montar la aplicación
  useEffect(() => cargar(), [cargar]);

  return { videojuegos, cargando, error, recargar: cargar };
}
