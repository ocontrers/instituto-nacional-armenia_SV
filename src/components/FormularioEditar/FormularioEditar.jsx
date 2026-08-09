import { useState, useEffect } from 'react';
import { actualizarAlumno } from '../../services/alumnosService';
import { manejarError } from '../../utils/manejarError';
import { validarCampos } from '../../utils/validarCampos';
import styles from './FormularioEditar.module.css';

const estadoInicial = {
  nombre: '',
  apellido: '',
  grado: '',
  seccion: '',
};

export const FormularioEditar = ({ alumnoEditar, onGuardado, onCancelar }) => {
  const [campos, setCampos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setCampos({
      nombre: alumnoEditar?.nombre,
      apellido: alumnoEditar?.apellido,
      grado: alumnoEditar?.grado,
      seccion: alumnoEditar?.seccion,
    });
  }, [alumnoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCampos((anterior) => ({ ...anterior, [name]: value }));

    if (errores[name]) {
      setErrores((anterior) => ({ ...anterior, [name]: null }));
    }
  };

  const handleGuardar = async () => {
    const erroresEncontrado = validarCampos(campos);

    if (Object.keys(erroresEncontrado).length > 0) {
      setErrores(erroresEncontrado);

      return;
    }

    try {
      setGuardando(true);
      await actualizarAlumno(alumnoEditar.id, campos);
      onGuardado();
    } catch (error) {
      console.error('Error al momento de guardar un alumno');
      manejarError(error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className='pagina-angosta'>
      <div className={`tarjeta-base ${styles.ficha}`}>
        <span className={styles.eyebrow}>Editar ficha</span>
        <h2 className={styles.titulo}>Actualizar alumno</h2>

        <div className='campo'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            id='nombre'
            type='text'
            name='nombre'
            value={campos.nombre}
            onChange={handleChange}
            placeholder='Ej: María'
          />
          {errores.nombre && <p className='error-campo'>{errores.nombre}</p>}
        </div>

        <div className='campo'>
          <label htmlFor='apellido'>Apellido</label>
          <input
            id='apellido'
            type='text'
            name='apellido'
            value={campos.apellido}
            onChange={handleChange}
            placeholder='Ej: Hernández'
          />
          {errores.apellido && (
            <p className='error-campo'>{errores.apellido}</p>
          )}
        </div>

        <div className={styles.fila}>
          <div className='campo'>
            <label htmlFor='grado'>Grado</label>
            <select
              id='grado'
              name='grado'
              value={campos.grado}
              onChange={handleChange}
            >
              <option value=''>Selecciona un grado</option>
              <option value='7to'>7to</option>
              <option value='8to'>8to</option>
              <option value='9to'>9to</option>
            </select>
            {errores.grado && <p className='error-campo'>{errores.grado}</p>}
          </div>

          <div className='campo'>
            <label htmlFor='seccion'>Sección</label>
            <select
              id='seccion'
              name='seccion'
              value={campos.seccion}
              onChange={handleChange}
            >
              <option value=''>Selecciona una sección</option>
              <option value='A'>A</option>
              <option value='B'>B</option>
            </select>
            {errores.seccion && (
              <p className='error-campo'>{errores.seccion}</p>
            )}
          </div>
        </div>

        <div className={styles.acciones}>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className='btn btn-primario'
          >
            {guardando ? 'Guardando…' : 'Actualizar alumno'}
          </button>

          <button onClick={onCancelar} className='btn btn-secundario'>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
