import '../styles/App.css';
import Form from '../components/form';
import ContenedorData from '../components/contenedorData';
import { useState } from 'react';


function App() {
  const [nivelAislamiento, setNivelAislamiento] = useState(null);
  const recibirNA = (valor) => setNivelAislamiento(valor);

  return (
    <div className="App">
      <h1 className='titulo-inicio'>Transacciones</h1>
      <div className="contenedor-principal-form">
        <Form onNivelAislamiento={recibirNA} nivelAislamiento={nivelAislamiento}/>
        <ContenedorData nivelAislamiento={nivelAislamiento}/>
      </div>
    </div>
  );
}
export default App;
