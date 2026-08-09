import { useState } from 'react';
import styles from './TarjetaAlumno.module.css';

export const TarjetaAlumno = ({
  id,
  nombre,
  apellido,
  grado,
  seccion,
  onSeleccionarAlumno,
  onEditar,
}) => {
  const [matriculaActiva, setMatriculaActiva] = useState(true);

  const toggleMatricula = () => setMatriculaActiva((prevState) => !prevState);

  return (
    <div className={styles.tarjeta}>
      <div className={styles.encabezadoTarjeta}>
        <h2 className={styles.nombre}>
          {nombre} {apellido}
        </h2>

        <span
          className={`badge ${matriculaActiva ? 'badge-musgo' : 'badge-ladrillo'}`}
        >
          {matriculaActiva ? 'Activa' : 'Inactiva'}
        </span>
      </div>

      <p className={styles.datos}>
        Grado <span className={styles.valorMono}>{grado || '—'}</span>
        <span className={styles.separador}>·</span>
        Sección <span className={styles.valorMono}>{seccion || '—'}</span>
      </p>

      <div className={styles.acciones}>
        <button
          className={`btn btn-sm ${matriculaActiva ? 'btn-peligro' : 'btn-exito'}`}
          onClick={toggleMatricula}
        >
          {matriculaActiva ? 'Desactivar matrícula' : 'Activar matrícula'}
        </button>

        <button
          className='btn btn-sm btn-secundario'
          onClick={() => onSeleccionarAlumno(id)}
        >
          Ver detalle
        </button>

        <button
          className='btn btn-sm btn-secundario'
          onClick={() => onEditar({ id, nombre, apellido, grado, seccion })}
        >
          Editar
        </button>
      </div>
    </div>
  );
};
