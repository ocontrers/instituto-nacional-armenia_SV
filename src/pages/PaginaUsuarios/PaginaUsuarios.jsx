import { useState, useEffect } from 'react';
import { obtenerUsuarios } from '../../services/authService';
import { manejarError } from '../../utils/manejarError';
import styles from './PaginaUsuarios.module.css';

export const PaginaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await obtenerUsuarios();

        setUsuarios(res);
      } catch (error) {
        setError(manejarError(error));
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className='pagina'>
      <div className={styles.filaTitulo}>
        <h2 className={styles.titulo}>Gestión de usuarios</h2>
        <p className={styles.contador}>
          {usuarios.length} usuario{usuarios.length !== 1 && 's'} registrado
          {usuarios.length !== 1 && 's'}
        </p>
      </div>

      {cargando && <p className={styles.vacio}>Cargando usuarios…</p>}

      {error && <p className='error-campo'>{error.mensaje || 'Ocurrió un error al cargar los usuarios.'}</p>}

      {!cargando && usuarios.length === 0 && !error && (
        <p className={styles.vacio}>
          No hay usuarios registrados en el sistema.
        </p>
      )}

      <div className={styles.lista}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} className={styles.tarjetaUsuario}>
            <div>
              <p className={styles.nombreUsuario}>{usuario.nombre}</p>
              <p className={styles.emailUsuario}>{usuario.email}</p>
            </div>
            <span className='badge badge-bronce'>{usuario.rol}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
