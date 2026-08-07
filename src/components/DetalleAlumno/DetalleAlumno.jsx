import { useState, useEffect } from 'react';
import { obtenerAlumnoPorId } from '../../services/alumnosService.js';

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
    <div>
      <h2>Detalle del alumno</h2>

      <p>
        Nombre: {alumno?.nombre} {alumno?.apellido}
      </p>

      <p>Grado: {alumno?.grado}</p>

      <p>Seccion: {alumno?.seccion}</p>

      <button onClick={onCerrar}>Cerrar detalle</button>
    </div>
  );
};
