import { useState, useEffect } from 'react';
import { TarjetaAlumno } from '../TarjetaAlumno/TarjetaAlumno.jsx';
import { obtenerAlumnos } from '../../services/alumnosService.js';
import { useNavigate } from 'react-router-dom';
import styles from './ListaAlumnos.module.css';

const ELEMENTOS_POR_PAGINA = 3;

export const ListaAlumnos = ({ recargar }) => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [gradoFiltro, setGradoFiltro] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await obtenerAlumnos();
        setAlumnos(res);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };

    fetchAlumnos();
  }, [recargar]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, gradoFiltro]);

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const coincideNombre = `${alumno?.nombre} ${alumno?.apellido}`
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideGrado =
      gradoFiltro === 'Todos' || alumno.grado === gradoFiltro;

    return coincideNombre && coincideGrado;
  });

  const totalPaginas = Math.ceil(
    alumnosFiltrados.length / ELEMENTOS_POR_PAGINA,
  );

  const indiceInicio = (paginaActual - 1) * ELEMENTOS_POR_PAGINA;
  const indiceFin = indiceInicio + ELEMENTOS_POR_PAGINA;
  const alumnosPagina = alumnosFiltrados.slice(indiceInicio, indiceFin);

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Listado de alumnos</h2>

      <div className={styles.controles}>
        <input
          type='text'
          placeholder='Buscar alumno por nombre...'
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.inputBusqueda}
        />

        <select
          value={gradoFiltro}
          onChange={(e) => setGradoFiltro(e.target.value)}
          className={styles.selectFiltro}
        >
          <option value='Todos'>Todos los grados</option>
          <option value='7to'>7° grado</option>
          <option value='8to'>8° grado</option>
          <option value='9to'>9° grado</option>
        </select>
      </div>

      <p className={styles.contador}>
        Mostrando: {alumnosFiltrados.length} alumnos de {alumnos.length}
      </p>

      <div className={styles.lista}>
        {alumnosPagina.map((alumno) => (
          <TarjetaAlumno
            key={alumno.id}
            id={alumno.id}
            nombre={alumno.nombre}
            apellido={alumno.apellido}
            grado={alumno.grado}
            seccion={alumno.seccion}
            onSeleccionarAlumno={(id) => navigate(`/alumnos/${id}`)}
            onEditar={(alumno) => navigate(`/alumnos/${alumno.id}/editar`)}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className={styles.paginacion}>
          <button
            onClick={() => setPaginaActual((anterior) => anterior - 1)}
            disabled={paginaActual === 1}
            className={styles.btnPagina}
          >
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
            (pagina) => (
              <button
                key={pagina}
                onClick={() => setPaginaActual(pagina)}
                className={`${styles.btnPagina} ${paginaActual === pagina ? styles.btnActivo : ''}`}
              >
                {pagina}
              </button>
            ),
          )}

          <button
            onClick={() => setPaginaActual((anterior) => anterior + 1)}
            disabled={paginaActual === totalPaginas}
            className={styles.btnPagina}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
