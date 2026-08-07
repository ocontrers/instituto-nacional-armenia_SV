import { useNavigate, Link } from 'react-router-dom';
import { obtenerRolUsuario } from '../../utils/jwt';

export const Encabezado = () => {
  const navigate = useNavigate();
  const usuarioGuardado = localStorage.getItem('usuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  const rol = obtenerRolUsuario();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    navigate('/login');
  };

  return (
    <header>
      <h1>Instituto Nacional de Armenia - Sistema de Gestion</h1>

      <nav>
        <Link to='/'>Alumnos</Link>

        {rol === 'ADMIN' && <Link to='/usuarios'>Usuarios</Link>}
      </nav>

      <p>Usuario activo: {usuario.nombre}</p>

      <button onClick={handleLogout}>Cerrar Sesion</button>
    </header>
  );
};
