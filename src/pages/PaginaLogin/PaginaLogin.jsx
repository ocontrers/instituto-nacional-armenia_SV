import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { manejarError } from '../../utils/manejarError';
import { validarCamposLogin } from '../../utils/validarCampos';

export const PaginaLogin = () => {
  const navigate = useNavigate();
  const [campos, setCampos] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState({});

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
      const res = await login(campos.email, campos.password);

      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));

      navigate('/');
    } catch (error) {
      setErrores(manejarError(error));
    }
  };

  return (
    <div>
      <h1>Instituto Nacional de Armenia</h1>
      <h2>Iniciar Sesión</h2>

      <div>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={campos.email}
          onChange={handleChange}
          placeholder='correo@ejemplo.com'
        />
        {errores.email && <p>{errores.email}</p>}
      </div>

      <div>
        <label>Contraseña</label>
        <input
          type='password'
          name='password'
          value={campos.password}
          onChange={handleChange}
          placeholder='Tu contraseña'
        />
        {errores.password && <p>{errores.password}</p>}
      </div>

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};
