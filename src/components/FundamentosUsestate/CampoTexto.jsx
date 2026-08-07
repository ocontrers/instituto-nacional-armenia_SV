import { useState } from 'react';

export const CampoTexto = () => {
  const [texto, setTexto] = useState('');

  console.log('Texto actual:', texto);

  return (
    <div>
      <h1>Componente CampoTexto</h1>

      <input
        type='text'
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder='Escribe algo...'
      />

      <p>Caracteres escritos: {texto.length}</p>

      <p>Lo que escribiste: {texto}</p>

      <button onClick={() => setTexto('')}>Limpiar</button>
    </div>
  );
};
