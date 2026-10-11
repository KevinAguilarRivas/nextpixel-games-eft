import { useEffect } from 'react';

const DURACION_MS = 3500;

/* =========================================================
   Notificacion: toast de Bootstrap para confirmar acciones
   (videojuego agregado, eliminado, mensaje enviado…).
   Props:
   - aviso: { id, mensaje, tipo } o null si no hay nada que mostrar
   - onCerrar: limpia el aviso en el estado del padre
   ========================================================= */
function Notificacion({ aviso, onCerrar }) {
  // Efecto: cierra el toast automáticamente después de unos segundos.
  // Depende de aviso.id para reiniciar el temporizador con cada aviso nuevo.
  useEffect(() => {
    if (!aviso) return undefined;
    const temporizador = setTimeout(onCerrar, DURACION_MS);
    return () => clearTimeout(temporizador);
  }, [aviso?.id]);

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      {aviso && (
        <div
          className={`toast show align-items-center border-0 text-bg-${aviso.tipo ?? 'success'}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{aviso.mensaje}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Cerrar notificación"
              onClick={onCerrar}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notificacion;
