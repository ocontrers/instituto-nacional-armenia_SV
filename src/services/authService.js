import { api } from '../api/axiosConfig';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });

  return response.data;
};

export const obtenerUsuarios = async () => {
  const response = await api.get('/auth/usuarios');

  return response.data;
};
