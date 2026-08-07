import { Navigate } from 'react-router-dom';
import { Encabezado } from '../../components/Encabezado/Encabezado';
import { obtenerRolUsuario } from '../../utils/jwt';

export const RutaProtegida = ({ children, rol }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (rol) {
    const rolUsuario = obtenerRolUsuario();

    if (rolUsuario !== rol) {
      return <Navigate to='/acceso-denegado' replace />;
    }
  }

  return (
    <>
      <Encabezado />

      {children}
    </>
  );
};
