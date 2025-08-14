import api  from '../api';
import { useState } from 'react';

import '../styles/entradas.css'

export default function Entradas({comando}){
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '' 
    });

    // Mostrar datos 1
    // Insertar 2
    // Actualizar 3
    // Eliminar 4
    console.log("Hola", comando)
    const obtenerDatos = (e)=>{
        setDatos({
            ...datos,
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
            )}

            {comando === "3" &&(
                <div>
                    <input 
                    type="number" 
                    placeholder='Id' 
                    name='id'
                    value={datos.nombre}
                    onChange={obtenerDatos}
                    />
                    <input 
                    type="text" 
                    placeholder='Nombre'
                    name='nombre'
                    value={datos.apellido}
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
                    value={datos.nombre}
                    onChange={obtenerDatos}
                    />
                </div>
            )}
        </div>
    )
}