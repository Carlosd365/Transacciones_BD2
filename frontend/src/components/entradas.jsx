import api  from '../api';
import { useState } from 'react';

import '../styles/entradas.css'

export default function Entradas({comando, onUsuarios}){

    const [usuario, setUsuario] = useState({
        id: 0,
        nombre: '',
        apellido: '' 
    });

    // Mostrar datos 1
    // Insertar 2
    // Actualizar 3
    // Eliminar 4
    const guardarInstruccion = async () =>{
        if (comando === "1"){
            try {
                const response = await api.get('/api/transaccion/leer');
                console.log("Hay algo aqui", response.data)
                onUsuarios(response.data)
            } catch (error) {
                alert('Error al mostrar datos');
            }

        } else if (comando === "2"){
            try {
                await api.post('/api/transaccion/insertar', {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                });
            } catch (error) {
                alert('Error al guardar datos');
            }
        

        } else if (comando === "3"){
            try {
                await api.put('/api/transaccion/actualizar', {
                    id: usuario.id,
                    nombre: usuario.nombre,
                });
            } catch (error) {
                alert('Error al actuallizar datos');
            }

        } else if (comando === "4"){
            try {
                await api.delete(`/api/transaccion/eliminar/${usuario.id}`);
            } catch (error) {
                alert('Error al eliminar datos');
            }

        }
    }
    const obtenerDatos = (e)=>{
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };
    return(
        <div className="inputs">
            {comando === "1" &&(
                <p>Datos de Usuario</p>
            )}

            {comando === "2" &&(
                <div>
                    <input 
                    type="text" 
                    placeholder='Nombres' 
                    name='nombre'
                    value={usuario.nombre}
                    onChange={obtenerDatos}
                    />
                    <input 
                    type="text" 
                    placeholder='Apellidos'
                    name='apellido'
                    value={usuario.apellido}
                    onChange={obtenerDatos}
                    />
                </div>
            )}

            {comando === "3" &&(
                <div>
                    <input 
                    type="number" 
                    placeholder='Id' 
                    name='id'
                    value={usuario.id}
                    onChange={obtenerDatos}
                    />
                    <input 
                    type="text" 
                    placeholder='Nombre'
                    name='nombre'
                    value={usuario.nombre}
                    onChange={obtenerDatos}
                    />
                </div>
            )}
            {comando === "4" &&(
                <div>
                    <input 
                    type="number" 
                    placeholder='Id' 
                    name='id'
                    value={usuario.id}
                    onChange={obtenerDatos}
                    />
                </div>
            )}

            {(comando === "1" || comando === "2" || comando === "3" || comando === "4") &&(
                <div>
                    <button className='btn-guardar-instruccion' onClick={guardarInstruccion}>Guardar</button>
                </div>
            )}
        </div>
    )
}