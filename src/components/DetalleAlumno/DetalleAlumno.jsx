import { useState, useEffect } from 'react';
import { obtenerAlumnoPorId } from '../../services/alumnosService.js';
import styles from './DetalleAlumno.module.css';

export const DetalleAlumno = ({ idAlumno, onCerrar }) => {
  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    const fetchAlumnoPorId = async () => {
      try {
        const res = await obtenerAlumnoPorId(idAlumno);

        setAlumno(res);
      } catch (error) {
        console.error('Error al obtener un alumno por su id: ', error);
      }
    };

    fetchAlumnoPorId();
  }, [idAlumno]);

  return (
    <div className='pagina-angosta'>
      <div className={`tarjeta-base ${styles.expediente}`}>
        <span className={styles.eyebrow}>Expediente del alumno</span>
        <h2 className={styles.titulo}>
          {alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Cargando…'}
        </h2>

        <dl className={styles.listaDatos}>
          <div className={styles.filaDato}>
            <dt>Grado</dt>
            <dd>{alumno?.grado || '—'}</dd>
          </div>
          <div className={styles.filaDato}>
            <dt>Sección</dt>
            <dd>{alumno?.seccion || '—'}</dd>
          </div>
        </dl>

        <button onClick={onCerrar} className='btn btn-secundario'>
          Cerrar detalle
        </button>
      </div>
    </div>
  );
};
