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
      <h2 className={styles.nombre}>
        Nombre: {nombre} {apellido}
      </h2>

      <p>
        Grado: {grado} / Seccion: {seccion}
      </p>

      <p>Estado de matricula: {matriculaActiva ? 'Activa' : 'Inactiva'}</p>

      <button
        className={
          matriculaActiva ? styles.estadoActivo : styles.estadoInactivo
        }
        onClick={toggleMatricula}
      >
        {matriculaActiva ? 'Desactivar matricula' : 'Activar matricula'}
      </button>

      <button onClick={() => onSeleccionarAlumno(id)}>Ver detalle</button>

      <button
        onClick={() => onEditar({ id, nombre, apellido, grado, seccion })}
      >
        Editar
      </button>
    </div>
  );
};
