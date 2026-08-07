import { useNavigate } from 'react-router-dom';
import { FormularioCrear } from '../../components/FormularioCrear/FormularioCrear';

export const PaginaCrearAlumno = () => {
  const navigate = useNavigate();

  return (
    <FormularioCrear
      onGuardado={() => navigate('/')}
      onCancelar={() => navigate('/')}
    />
  );
};
