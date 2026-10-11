import { useCallback, useEffect, useState } from 'react';
import { obtenerVideojuegos } from '../services/api.js';

/* =========================================================
   Hook personalizado: maneja la lista de videojuegos.
   - useState guarda la lista, el estado de carga y el error.
   - useEffect carga los datos desde la API simulada al montar.
   - agregar / eliminar modifican el estado de forma inmutable
     (se crea un arreglo nuevo, nunca se modifica el anterior).
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

  // Agrega un videojuego nuevo con un id único al final de la lista
  const agregar = (datos) => {
    setVideojuegos((prev) => {
      const nuevoId = prev.reduce((max, juego) => Math.max(max, juego.id), 0) + 1;
      return [...prev, { ...datos, id: nuevoId }];
    });
  };

  // Elimina el videojuego con el id indicado
  const eliminar = (id) => {
    setVideojuegos((prev) => prev.filter((juego) => juego.id !== id));
  };

  return { videojuegos, cargando, error, recargar: cargar, agregar, eliminar };
}
