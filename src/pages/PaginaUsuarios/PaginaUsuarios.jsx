import { useState, useEffect } from 'react';
import { obtenerUsuarios } from '../../services/authService';
import { manejarError } from '../../utils/manejarError';

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
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Gestion de usuarios</h2>

      <p>Total de usuarios registrados: {usuarios.length}</p>

      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados en el sistema</p>
      ) : (
        usuarios.map((usuario) => (
          <div key={usuario.id}>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
          </div>
        ))
      )}
    </div>
  );
};
