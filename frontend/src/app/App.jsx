import '../styles/App.css';
import Form from '../components/form';
import ContenedorData from '../components/contenedorData';
import { useState } from 'react';


function App() {
  const [nivelAislamiento, setNivelAislamiento] = useState(null);
  const [usuarios, setUsuarios] = useState ([])
  const recibirNA = (valor) => setNivelAislamiento(valor);
  const recibirUsuario = (valor) => setUsuarios(valor);

  return (
    <div className="App">
      <h1 className='titulo-inicio'>Transacciones</h1>
      <div className="contenedor-principal-form">
        <Form onNivelAislamiento={recibirNA} nivelAislamiento={nivelAislamiento} onUsuarios={recibirUsuario} usuarios={usuarios}/>
        <ContenedorData nivelAislamiento={nivelAislamiento} usuarios={usuarios}/>
      </div>
    </div>
  );
}
export default App;
