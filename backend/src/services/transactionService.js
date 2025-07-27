const pool = require('../config/db');

let conexionActiva = null;

async function iniciarTransaccion() {
    if (conexionActiva) throw new Error('Ya hay una transacción activa');
    conexionActiva = await pool.getConnection();
    await conexionActiva.beginTransaction();
}

async function insertarUsuario(nombre, apellido) {
    if (!conexionActiva) throw new Error('No hay transacción activa');
    const [result] = await conexionActiva.query(
        'INSERT INTO usuario (nombre, apellido) VALUES (?, ?)',
        [nombre, apellido]
    );
    return result.insertId;
}

async function commitTransaccion() {
    if (!conexionActiva) throw new Error('No hay transacción activa');
    await conexionActiva.commit();
    conexionActiva.release();
    conexionActiva = null;
}

async function rollbackTransaccion() {
    if (!conexionActiva) throw new Error('No hay transacción activa');
    await conexionActiva.rollback();
    conexionActiva.release();
    conexionActiva = null;
}

module.exports = {
    iniciarTransaccion,
    insertarUsuario,
    commitTransaccion,
    rollbackTransaccion
};