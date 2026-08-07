export const manejarError = (error) => {
  if (!error.response) {
    return 'No se pudo conectar con el servidor. Verifica tu conexion';
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return data?.message || 'Los datos enviados no son validos';

    case 401:
      return data?.message || 'Sesion expirada';

    case 403:
      return data?.message || 'No tienes permisos para realizar esta accion';

    case 404:
      return data?.message || 'El recurso solicitado no fue encontrado';

    case 500:
      return (
        data?.message ||
        'Ocurrio un error en el servidor. Intenta de nuevo mas tarde'
      );

    default:
      return data?.message || 'Ocurrio un error inesperado';
  }
};
