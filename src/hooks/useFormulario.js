import { useState } from 'react';

/* =========================================================
   Hook personalizado reutilizable para formularios controlados.
   Lo usan el formulario de contacto y el de administración.
   - valores: lo que el usuario escribe en cada campo
   - tocados: campos que el usuario ya visitó (para no mostrar
     errores antes de tiempo)
   - errores: se calculan con la función "validar" en cada render
   ========================================================= */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [tocados, setTocados] = useState({});
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  const errores = validar(valores);
  const esValido = Object.keys(errores).length === 0;

  // Actualiza el valor del campo que disparó el evento (usa el atributo name)
  const manejarCambio = (event) => {
    const { name, value } = event.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  // Marca el campo como tocado al salir de él
  const manejarBlur = (event) => {
    const { name } = event.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
  };

  // Indica si se debe mostrar el error de un campo
  const mostrarError = (campo) => intentoEnviar || Boolean(tocados[campo]);

  // Envuelve el submit: evita recargar la página y solo llama a onValido si no hay errores
  const manejarSubmit = (onValido) => (event) => {
    event.preventDefault();
    setIntentoEnviar(true);
    if (esValido) onValido(valores);
  };

  const reiniciar = () => {
    setValores(valoresIniciales);
    setTocados({});
    setIntentoEnviar(false);
  };

  return { valores, errores, esValido, mostrarError, manejarCambio, manejarBlur, manejarSubmit, reiniciar };
}
