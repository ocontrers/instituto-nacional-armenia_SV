import { useState } from 'react';

export const Interruptor = () => {
  const [encendido, setEncendido] = useState(false);

  console.log('estado de encendido: ', encendido);

  return (
    <div>
      <h1>Ejemplo 1: Interruptor de luz</h1>

      <p>La luz esta: {encendido ? 'encendida' : 'apagada'}</p>

      <button onClick={() => setEncendido((anterior) => !anterior)}>
        {encendido ? 'Apagar' : 'Encender'}
      </button>
    </div>
  );
};
