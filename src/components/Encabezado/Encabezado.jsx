import { useNavigate, Link, NavLink } from 'react-router-dom';
import { obtenerRolUsuario } from '../../utils/jwt';
import styles from './Encabezado.module.css';

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
    <header className={styles.encabezado}>
      <div className={styles.franja}>
        <Link to='/' className={styles.marca}>
          <img
            src='/logo-ina-icono.png'
            alt=''
            className={styles.logo}
          />
          <div className={styles.textoMarca}>
            <span className={styles.eyebrow}>Instituto Nacional de</span>
            <span className={styles.nombreInstitucion}>Armenia</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActivo}` : styles.navLink
            }
          >
            Alumnos
          </NavLink>

          {rol === 'ADMIN' && (
            <NavLink
              to='/usuarios'
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActivo}` : styles.navLink
              }
            >
              Usuarios
            </NavLink>
          )}
        </nav>

        <div className={styles.sesion}>
          <span className={styles.usuarioActivo}>
            {usuario?.nombre}
          </span>
          <button onClick={handleLogout} className='btn btn-fantasma btn-sm'>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};
