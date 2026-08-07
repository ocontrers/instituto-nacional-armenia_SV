export const validarCampos = (campos) => {
  const errores = {};

  if (campos.nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (campos.apellido.trim().length < 2) {
    errores.apellido = 'El apellido debe tener al menos 2 caracteres';
  }

  if (campos.grado === '') {
    errores.grado = 'Debes seleccionar un grado';
  }

  if (campos.seccion === '') {
    errores.seccion = 'Debes seleccionar una seccion';
  }

  return errores;
};

export const validarCamposLogin = (campos) => {
  const errores = {};

  if (campos.email.trim() === '') {
    errores.email = 'El email es obligatorio';
  }

  if (campos.password.trim() === '') {
    errores.password = 'La contraseña es obligatoria';
  }

  return errores;
};
