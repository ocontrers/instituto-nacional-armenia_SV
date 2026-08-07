import { Routes, Route } from 'react-router-dom';
import { PaginaListaAlumnos } from './pages/PaginaListaAlumnos/PaginaListaAlumnos';
import { PaginaDetalleAlumno } from './pages/PaginaDetalleAlumno/PaginaDetalleAlumno';
import { PaginaCrearAlumno } from './pages/PaginaCrearAlumno/PaginaCrearAlumno';
import { PaginaEditarAlumno } from './pages/PaginaEditarAlumno/PaginaEditarAlumno';
import { PaginaLogin } from './pages/PaginaLogin/PaginaLogin';
import { RutaProtegida } from './components/RutaProtegida/RutaProtegida';
import { PaginaUsuarios } from './pages/PaginaUsuarios/PaginaUsuarios';
import { PaginaAccesoDenegado } from './pages/PaginaAccesoDenegado/PaginaAccesoDenegado';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<PaginaLogin />} />

        <Route path='/acceso-denegado' element={<PaginaAccesoDenegado />} />

        <Route
          path='/'
          element={
            <RutaProtegida>
              <PaginaListaAlumnos />
            </RutaProtegida>
          }
        />

        <Route
          path='/alumnos/nuevo'
          element={
            <RutaProtegida>
              <PaginaCrearAlumno />
            </RutaProtegida>
          }
        />

        <Route
          path='/alumnos/:id'
          element={
            <RutaProtegida>
              <PaginaDetalleAlumno />
            </RutaProtegida>
          }
        />

        <Route
          path='/alumnos/:id/editar'
          element={
            <RutaProtegida>
              <PaginaEditarAlumno />
            </RutaProtegida>
          }
        />

        <Route
          path='/usuarios'
          element={
            <RutaProtegida rol='ADMIN'>
              <PaginaUsuarios />
            </RutaProtegida>
          }
        />
      </Routes>
    </>
  );
}

export default App;
