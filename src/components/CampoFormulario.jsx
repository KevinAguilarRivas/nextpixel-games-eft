/* =========================================================
   CampoFormulario: componente reutilizable para los campos de
   los formularios (contacto y administración). Muestra la
   etiqueta, el control y el mensaje de error con las clases de
   validación de Bootstrap (is-invalid / invalid-feedback).
   Props:
   - id (único en la página), name (clave del campo; por defecto = id)
   - label, tipo ('text', 'email', 'number', 'textarea', 'select'…)
   - value, onChange, onBlur
   - error: mensaje a mostrar (o undefined si es válido)
   - mostrarError: true cuando el usuario ya tocó el campo o intentó enviar
   - ayuda: texto de ayuda opcional bajo el campo
   - children: <option> cuando tipo === 'select'
   - el resto de props (placeholder, rows, min…) se pasan al control
   ========================================================= */
function CampoFormulario({ id, name = id, label, tipo = 'text', error, mostrarError, ayuda, children, className = '', ...resto }) {
  const invalido = mostrarError && Boolean(error);
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = invalido ? `${id}-error` : undefined;

  const propsControl = {
    id,
    name,
    className: `${tipo === 'select' ? 'form-select' : 'form-control'}${invalido ? ' is-invalid' : ''}`,
    'aria-invalid': invalido,
    'aria-describedby': [idAyuda, idError].filter(Boolean).join(' ') || undefined,
    ...resto,
  };

  let control;
  if (tipo === 'textarea') {
    control = <textarea {...propsControl} />;
  } else if (tipo === 'select') {
    control = <select {...propsControl}>{children}</select>;
  } else {
    control = <input type={tipo} {...propsControl} />;
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {control}
      {ayuda && (
        <div id={idAyuda} className="form-text">
          {ayuda}
        </div>
      )}
      {invalido && (
        <div id={idError} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
}

export default CampoFormulario;
