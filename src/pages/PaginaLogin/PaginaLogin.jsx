import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { manejarError } from '../../utils/manejarError';
import { validarCamposLogin } from '../../utils/validarCampos';
import styles from './PaginaLogin.module.css';

export const PaginaLogin = () => {
  const navigate = useNavigate();
  const [campos, setCampos] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCampos((anterior) => ({ ...anterior, [name]: value }));

    if (errores[name]) {
      setErrores((anterior) => ({ ...anterior, [name]: null }));
    }
  };

  const handleLogin = async () => {
    const erroresEncontrados = validarCamposLogin(campos);

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados);
      return;
    }

    try {
      setEnviando(true);
      const res = await login(campos.email, campos.password);

      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));

      navigate('/');
    } catch (error) {
      setErrores(manejarError(error));
    } finally {
      setEnviando(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className={styles.pantalla}>
      <aside className={styles.panelInstitucional}>
        <div className={styles.contenidoPanel}>
          <img
            src='/logo-ina.png'
            alt='Escudo del Instituto Nacional de Armenia'
            className={styles.escudo}
          />
          <p className={styles.lema}>Estudio · Sabiduría · Progreso</p>
          <p className={styles.ubicacion}>Sonsonate, El Salvador</p>
        </div>
      </aside>

      <main className={styles.panelFormulario}>
        <div className={styles.tarjetaLogin}>
          <span className={styles.eyebrow}>Sistema de Gestión</span>
          <h1 className={styles.titulo}>Iniciar sesión</h1>
          <p className={styles.subtitulo}>
            Ingresa con tu cuenta institucional para administrar los registros
            de alumnos.
          </p>

          <div className='campo'>
            <label htmlFor='email'>Correo institucional</label>
            <input
              id='email'
              type='email'
              name='email'
              value={campos.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='correo@ejemplo.com'
              autoComplete='username'
            />
            {errores.email && <p className='error-campo'>{errores.email}</p>}
          </div>

          <div className='campo'>
            <label htmlFor='password'>Contraseña</label>
            <input
              id='password'
              type='password'
              name='password'
              value={campos.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='Tu contraseña'
              autoComplete='current-password'
            />
            {errores.password && (
              <p className='error-campo'>{errores.password}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={enviando}
            className={`btn btn-primario ${styles.btnIngresar}`}
          >
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </div>
      </main>
    </div>
  );
};
