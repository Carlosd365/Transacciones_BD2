const {
    iniciarTransaccion,
    insertarUsuario,
    commitTransaccion,
    rollbackTransaccion
} = require('../services/transactionService');

exports.iniciar = async (req, res) => {
    try {
        await iniciarTransaccion();
        console.log('Transacción iniciada');
        res.json({ mensaje: 'Transacción iniciada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar transacción', error: error.message });
    }
};

exports.insertar = async (req, res) => {
    const { nombre, apellido } = req.body;
    try {
        const id = await insertarUsuario(nombre, apellido);
        console.log(`Usuario insertado con ID: ${id}`);
        res.json({ mensaje: 'Datos insertados', id });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al insertar', error: error.message });
    }
};

exports.commit = async (req, res) => {
    try {
        await commitTransaccion();
        console.log('Commit realizado');
        res.json({ mensaje: 'Commit realizado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en commit', error: error.message });
    }
};

exports.rollback = async (req, res) => {
    try {
        await rollbackTransaccion();
        console.log('Rollback realizado');
        res.json({ mensaje: 'Rollback realizado' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en rollback', error: error.message });
    }
};