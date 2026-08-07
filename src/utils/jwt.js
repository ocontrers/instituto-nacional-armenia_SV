export const decodificarToken = (token) => {
  try {
    const payload = token.split('.')[1];

    const decodificado = JSON.parse(atob(payload));

    return decodificado;
  } catch (error) {
    return null;
  }
};

export const obtenerRolUsuario = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  const payload = decodificarToken(token);

  return payload?.rol || null;
};
