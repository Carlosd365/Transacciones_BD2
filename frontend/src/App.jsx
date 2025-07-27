import './App.css';
import React, { useState } from 'react';
import api  from './api';


function App() {
  const [transaccion, setTransaccion] = useState(false);
  const [guardar, setGuardar] = useState(false);
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '' 
  });

  const iniciarTransaccion = async () =>{
    try {
    await api.post('/api/transaccion/iniciar');
    setTransaccion(true);
  } catch (error) {
    alert('Error al iniciar transacción');
  }
  };

  const obtenerDatos = (e)=>{
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const guardarDatos = async () =>{
    try {
      await api.post('/api/transaccion/insertar', {
        nombre: datos.nombre,
        apellido: datos.apellido,
      });
      setGuardar(true);
      setDatos({ nombre: '', apellido: '' });
    } catch (error) {
      alert('Error al guardar datos');
    }
  };

  const commitDatos = async () => {
    try {
      await api.post('/api/transaccion/commit');
      setGuardar(false);
      setTransaccion(false);
    } catch (error) {
      alert('Error al hacer commit');
    }
  };

  const rollBackDatos = async () => {
    try {
      await api.post('/api/transaccion/rollback');
      setGuardar(false);
      setTransaccion(false);
    } catch (error) {
      alert('Error al hacer rollback');
    }
  };

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
