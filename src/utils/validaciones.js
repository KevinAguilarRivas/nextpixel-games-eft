/* =========================================================
   Validaciones de formularios (funciones puras).
   Cada función recibe los datos del formulario y devuelve un
   objeto de errores { campo: 'mensaje' }. Si el objeto está
   vacío, los datos son válidos.
   ========================================================= */

// Solo letras (con tildes y ñ), espacios, apóstrofes y guiones
const REGEX_NOMBRE_PERSONA = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
// Formato básico de correo: texto@dominio.ext
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// URL de imagen (http/https) o ruta relativa dentro de /public
const REGEX_IMAGEN = /^(https?:\/\/\S+|img\/\S+)$/i;

export const LIMITE_MENSAJE = 500;

export function validarContacto({ nombre, email, mensaje }) {
  const errores = {};
  const nombreLimpio = nombre.trim();
  const emailLimpio = email.trim();
  const mensajeLimpio = mensaje.trim();

  if (!nombreLimpio) {
    errores.nombre = 'Ingresa tu nombre.';
  } else if (nombreLimpio.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  } else if (!REGEX_NOMBRE_PERSONA.test(nombreLimpio)) {
    errores.nombre = 'El nombre solo puede contener letras y espacios.';
  }

  if (!emailLimpio) {
    errores.email = 'Ingresa tu correo electrónico.';
  } else if (!REGEX_EMAIL.test(emailLimpio)) {
    errores.email = 'Ingresa un correo válido, por ejemplo: nombre@correo.cl';
  }

  if (!mensajeLimpio) {
    errores.mensaje = 'Escribe tu mensaje.';
  } else if (mensajeLimpio.length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  } else if (mensajeLimpio.length > LIMITE_MENSAJE) {
    errores.mensaje = `El mensaje no puede superar los ${LIMITE_MENSAJE} caracteres.`;
  }

  return errores;
}

export function validarVideojuego({ nombre, categoria, plataforma, precio, descripcion, imagen }, categorias, nombresExistentes = []) {
  const errores = {};
  const nombreLimpio = nombre.trim();
  const precioNumero = Number(precio);

  if (!nombreLimpio) {
    errores.nombre = 'Ingresa el nombre del videojuego.';
  } else if (nombreLimpio.length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres.';
  } else if (nombresExistentes.some((n) => n.toLowerCase() === nombreLimpio.toLowerCase())) {
    errores.nombre = 'Ese videojuego ya existe en el catálogo.';
  }

  if (!categoria || !(categoria in categorias)) {
    errores.categoria = 'Selecciona una categoría.';
  }

  if (!plataforma.trim()) {
    errores.plataforma = 'Indica al menos una plataforma.';
  }

  if (precio === '') {
    errores.precio = 'Ingresa el precio.';
  } else if (!Number.isInteger(precioNumero) || precioNumero < 1000 || precioNumero > 500000) {
    errores.precio = 'El precio debe ser un número entero entre $1.000 y $500.000.';
  }

  if (!descripcion.trim()) {
    errores.descripcion = 'Escribe una descripción breve.';
  } else if (descripcion.trim().length < 15) {
    errores.descripcion = 'La descripción debe tener al menos 15 caracteres.';
  }

  if (imagen.trim() && !REGEX_IMAGEN.test(imagen.trim())) {
    errores.imagen = 'Usa una URL que empiece con http(s):// o déjalo vacío.';
  }

  return errores;
}
