import { useState } from 'react';
import CampoFormulario from './CampoFormulario.jsx';
import { useFormulario } from '../hooks/useFormulario.js';
import { LIMITE_MENSAJE, validarContacto } from '../utils/validaciones.js';

const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' };

/* =========================================================
   FormularioContacto: formulario para escribir al administrador.
   Valida nombre, email y mensaje antes de enviar y muestra los
   errores bajo cada campo (clases de validación de Bootstrap).
   Props:
   - onEnviado: avisa al padre que el mensaje se envió (toast)
   ========================================================= */
function FormularioContacto({ onEnviado }) {
  const { valores, errores, esValido, mostrarError, manejarCambio, manejarBlur, manejarSubmit, reiniciar } =
    useFormulario(VALORES_INICIALES, validarContacto);

  // Estado local: nombre de quien envió el último mensaje (para el mensaje de éxito)
  const [enviadoPor, setEnviadoPor] = useState(null);
  const [intentoFallido, setIntentoFallido] = useState(false);

  const enviar = (datos) => {
    // Simulación: no hay backend, el mensaje se "envía" y se confirma en pantalla
    setEnviadoPor(datos.nombre.trim());
    setIntentoFallido(false);
    reiniciar();
    onEnviado(datos);
  };

  const manejarEnvio = (event) => {
    setIntentoFallido(!esValido);
    if (esValido) setEnviadoPor(null);
    manejarSubmit(enviar)(event);
  };

  const campo = (nombreCampo) => ({
    id: `contacto-${nombreCampo}`,
    name: nombreCampo,
    value: valores[nombreCampo],
    onChange: manejarCambio,
    onBlur: manejarBlur,
    error: errores[nombreCampo],
    mostrarError: mostrarError(nombreCampo),
  });

  const largoMensaje = valores.mensaje.trim().length;

  return (
    <form className="card panel-card" onSubmit={manejarEnvio} noValidate>
      <div className="card-body p-4">
        {/* Renderizado condicional: alerta de error general o de éxito */}
        {intentoFallido && !esValido && (
          <div className="alert alert-danger" role="alert">
            Revisa los campos marcados en rojo antes de enviar.
          </div>
        )}
        {enviadoPor && (
          <div className="alert alert-success alert-dismissible" role="status">
            ¡Gracias, <strong>{enviadoPor}</strong>! Recibimos tu mensaje y te responderemos dentro de 24 horas.
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setEnviadoPor(null)}></button>
          </div>
        )}

        <div className="row g-3">
          <CampoFormulario
            {...campo('nombre')}
            label="Nombre"
            placeholder="Tu nombre"
            autoComplete="name"
            className="col-12 col-md-6"
          />
          <CampoFormulario
            {...campo('email')}
            tipo="email"
            label="Email"
            placeholder="nombre@correo.cl"
            autoComplete="email"
            className="col-12 col-md-6"
          />
          <CampoFormulario
            {...campo('mensaje')}
            tipo="textarea"
            label="Mensaje"
            rows="5"
            placeholder="¿En qué te podemos ayudar?"
            maxLength={LIMITE_MENSAJE}
            ayuda={`${largoMensaje}/${LIMITE_MENSAJE} caracteres (mínimo 10).`}
            className="col-12"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4 px-4">
          Enviar mensaje
        </button>
      </div>
    </form>
  );
}

export default FormularioContacto;
