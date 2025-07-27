import './App.css';
import React, { useState } from 'react';

function App() {
  const [transaccion, setTransaccion] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '' // Nota preguntar a carlos como estan los atributos
  });

  const obtenerDatos = (e)=>{
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarInputs = () =>{
    setGuardar(true);
    setDatos({
      nombre: '',
    apellido: '',
    });
  };

  const commitRollBackDatos = () => {
    setGuardar(false);
    setTransaccion(false);
  }

  return (
    <div className="App">
      <div className="contenedor-principal-form">
        <div className="formulario">
          <div className="inputs">
            <input 
              type="text" 
              placeholder='Nombres' 
              name='nombre'
              value={datos.nombre}
              onChange={obtenerDatos}
            />
            <input 
              type="text" 
              placeholder='Apellidos'
              name='apellido'
              value={datos.apellido}
              onChange={obtenerDatos}
            />
          </div>
          <div className="buttons">
            <button 
              className="btn-accion" 
              onClick={()=> setTransaccion(true)} 
              disabled={transaccion === true}>
                Transacción
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || datos.apellido.trim() === ''  || datos.nombre.trim() === ''}
              onClick={limpiarInputs}>
                Guardar Datos
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || guardar === false }
              onClick={commitRollBackDatos}>
                Commit
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || guardar === false}
              onClick={commitRollBackDatos}>
                RollBack
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default App;
