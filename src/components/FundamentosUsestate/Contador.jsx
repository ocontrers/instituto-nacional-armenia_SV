import { useState } from 'react';

export const Contador = () => {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador((anterior) => anterior + 1);

  const decrementar = () => setContador((anterior) => anterior - 1);

  const reiniciar = () => setContador(0);

  return (
    <div>
      <h2>Contador: {contador}</h2>

      <button onClick={incrementar}>Incrementar</button>

      <button onClick={decrementar}>Decrementar</button>

      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
};
