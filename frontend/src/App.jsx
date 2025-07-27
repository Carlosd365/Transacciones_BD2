import './App.css';
import React, { useState } from 'react';
import api  from './api';


function App() {
  const [transaccion, setTransaccion] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '' // Nota preguntar a carlos como estan los atributos
  });

  const iniciarTransaccion = async () =>{
    setTransaccion(true);

    // Aqui va la petición para iniciar la transacción (Carlos)
    // Ejemplo const response = await api.get('/hola');
  };

  const obtenerDatos = (e)=>{
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const guardarDatos = () =>{
    setGuardar(true);
    setDatos({
      nombre: '',
    apellido: '',
    });

    // Aqui va la petición para hacer inserción (Carlos)
    // accedes a los datos 
    //const nombre = datos.nombre
  };

  const commitDatos = () => {
    setGuardar(false);
    setTransaccion(false);
    // Aqui va la petición para hacer commit (Carlos)
  }

   const rollBackDatos = () => {
    setGuardar(false);
    setTransaccion(false);
    // Aqui va la petición para hacer rollBack (Carlos)
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
              onClick={iniciarTransaccion} 
              disabled={transaccion === true}>
                Transacción
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || datos.apellido.trim() === ''  || datos.nombre.trim() === ''}
              onClick={guardarDatos}>
                Guardar Datos
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || guardar === false }
              onClick={commitDatos}>
                Commit
            </button>
            <button 
              className="btn-accion" 
              disabled={transaccion === false || guardar === false}
              onClick={rollBackDatos}>
                RollBack
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
export default App;
