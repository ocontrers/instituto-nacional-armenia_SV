import { useNavigate } from 'react-router-dom';
import styles from './PaginaAccesoDenegado.module.css';

export const PaginaAccesoDenegado = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pantalla}>
      <div className={styles.contenido}>
        <span className={styles.eyebrow}>Error 403</span>
        <h2 className={styles.titulo}>Acceso denegado</h2>
        <p className={styles.texto}>
          No tienes permisos para acceder a esta sección. Si crees que esto es
          un error, contacta al administrador del sistema.
        </p>

        <button onClick={() => navigate('/')} className='btn btn-primario'>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};
