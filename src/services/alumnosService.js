import { api } from '../api/axiosConfig.js';

export const obtenerAlumnos = async () => {
  const response = await api.get('/alumnos');

  return response.data;
};

export const obtenerAlumnoPorId = async (id) => {
  const response = await api.get(`/alumnos/${id}`);

  return response.data;
};

export const crearAlumno = async (alumno) => {
  const response = await api.post('/alumnos', alumno);

  return response.data;
};

export const actualizarAlumno = async (id, alumno) => {
  const response = await api.patch(`/alumnos/${id}`, alumno);

  return response.data;
};
