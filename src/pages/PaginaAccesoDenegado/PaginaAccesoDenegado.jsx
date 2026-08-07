import { useNavigate } from 'react-router-dom';

export const PaginaAccesoDenegado = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Acceso Denegado</h2>

      <p>
        No tienes permisos para acceder a esta seccion. Contacta al
        administrador del sistema
      </p>

      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};
