import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ListaAlumnos } from '../../components/ListaAlumnos/ListaAlumnos';

export const PaginaListaAlumnos = () => {
  const [recargar, setRecargar] = useState(0);

  return (
    <div>
      <Link to={'/alumnos/nuevo'}>Registrar nuevo alumno</Link>

      <ListaAlumnos recargar={recargar} />
    </div>
  );
};
