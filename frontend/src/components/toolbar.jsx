import api  from '../api';
import { useState } from 'react';
import '../styles/toolbar.css'

export default function Toolbar ({onNivelAislamiento, onCambiarComando}){
    const [nivelAislamiento, setNivelAislamiento] = useState("");
    const [transaccion, setTransaccion] = useState(false);
    
    const [comando, setComando] = useState("");

    const [guardar, setGuardar] = useState(false);
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '' 
    });

    // Cambiar nivel de aislamiento 
    const cambiarNivelAislamiento = async (e)=>{
        setNivelAislamiento(e.target.value);
        // Aqui consulta a api
    };

    const obtenerNivelAislamiento = async () =>{
        // Aqui consulta api
        const data = 'Read uncommitted'
        onNivelAislamiento(data)
    };

    const iniciarTransaccion = async () =>{
        try {
        await api.post('/api/transaccion/iniciar');
        setTransaccion(true);
    } catch (error) {
        alert('Error al iniciar transacción');
    }
    };

    // Aqui obtenemos que operación se desea
    const obtenerComando = (e) => {
        setComando(e)
        console.log("Seleccionaste:", e.target.value);
        onCambiarComando(e.target.value)
    }

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
                    disabled={transaccion === true}>
                        Transacción
                </button>
                <select className="select" name="operaciones" id="2" value={comando} onChange={obtenerComando}>
                    <option value="" disabled selected>Operación</option>
                    <option value="1">Mostrar Datos</option>
                    <option value="2">Ingresar Datos</option>
                    <option value="3">Actualizar</option>
                    <option value="4">Eliminar</option>
                </select>
                <select className="select" name="acciones-transaccion" id="1">
                    <option value="" disabled selected>Acciones</option>
                    <option value="1">Commit</option>
                    <option value="2">RollBack</option>
                </select>
            </div>
        </div>

    );
};