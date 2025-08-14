import api  from '../api';
import { useState } from 'react';
import '../styles/toolbar.css'

export default function Toolbar ({onNivelAislamiento, onCambiarComando}){
    const [nivelAislamiento, setNivelAislamiento] = useState("");
    
    const [comando, setComando] = useState("");



    // Cambiar nivel de aislamiento 
    const cambiarNivelAislamiento = async (e)=>{
        setNivelAislamiento(e.target.value);
        console.log(e.target.value)
        try {
            await api.post('/api/transaccion/cambiarNivel', {nivel: e.target.value});
        } catch (error) {
            alert('Error al cambiar de nivel', error);
        }
    };

    const obtenerNivelAislamiento = async () =>{
        // Aqui consulta api
        try {
            const response = await api.post('/api/transaccion/obtenerNivel');
            const data = response.data;
            onNivelAislamiento(data);
            console.log("Obtener", data)
        } catch (error) {
            alert('Error al obtener de nivel');
        }
    };

    const iniciarTransaccion = async () =>{
        try {
            await api.post('/api/transaccion/iniciar');
        } catch (error) {
            alert('Error al iniciar transacción');
        }
    };

    // Aqui obtenemos que operación se desea
    const obtenerComando = (e) => {
        setComando(e.target.value)
        console.log("Seleccionaste:", e.target.value);
        onCambiarComando(e.target.value)
    }

    const accionesTransaccion = async (e) =>{
        const value = e.target.value;
        if (value === "1"){
            
                try {
                    await api.post('/api/transaccion/commit');
                } catch (error) {
                    alert('Error al hacer commit');
                }
            
        }
        if (value=== "2"){
                try {
                    await api.post('/api/transaccion/rollback');
                } catch (error) {
                    alert('Error al hacer rollback');
                }
            
        }
    }

    return (
        <div className="toolbar">
            <div className="select-container">
                <select className="select" name="nivel-aislamiento" id="1" value={nivelAislamiento} onChange={cambiarNivelAislamiento}> 
                    <option value="" disabled selected>Nivel de Aislamiento</option>
                    <option value="1">Read Uncommitted</option>
                    <option value="2">Read Committed</option>
                    <option value="3">Repeatable Read</option>
                    <option value="4">Serializable</option>
                    
                </select>
                <button 
                    className="btn-accion" 
                    onClick={obtenerNivelAislamiento}
                    >
                        Saber Nivel de Aislamiento
                </button>
            </div>

            <div className="buttons">
                <button 
                    className="btn-accion" 
                    onClick={iniciarTransaccion} 
                    >
                        Transacción
                </button>
                <select className="select" name="operaciones" id="2" value={comando} onChange={obtenerComando}>
                    <option value="" disabled selected>Operación</option>
                    <option value="1">Mostrar Datos</option>
                    <option value="2">Ingresar Datos</option>
                    <option value="3">Actualizar</option>
                    <option value="4">Eliminar</option>
                </select>
                <select className="select" name="acciones-transaccion" id="1"onChange={accionesTransaccion}>
                    <option value="" disabled selected>Acciones</option>
                    <option value="1">Commit</option>
                    <option value="2">RollBack</option>
                </select>
            </div>
        </div>

    );
};