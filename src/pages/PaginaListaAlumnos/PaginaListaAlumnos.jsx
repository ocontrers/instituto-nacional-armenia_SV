import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListaAlumnos } from '../../components/ListaAlumnos/ListaAlumnos';
import styles from './PaginaListaAlumnos.module.css';

export const PaginaListaAlumnos = () => {
  const [recargar] = useState(0);

  return (
    <div className='pagina'>
      <div className={styles.barraAcciones}>
        <Link to={'/alumnos/nuevo'} className='btn btn-primario'>
          + Registrar nuevo alumno
        </Link>
      </div>

      <ListaAlumnos recargar={recargar} />
    </div>
  );
};
