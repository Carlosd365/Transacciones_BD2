const {
    iniciarTransaccion,
    insertarUsuario,
    commitTransaccion,
    rollbackTransaccion
} = require('../services/transactionService');

exports.iniciar = async (req, res) => {
    try {
        await iniciarTransaccion();
        res.json({ mensaje: 'Transacción iniciada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar transacción', error: error.message });
    }
};

exports.insertar = async (req, res) => {
    const { nombre, apellido } = req.body;
    try {
        const id = await insertarUsuario(nombre, apellido);
        res.json({ mensaje: 'Datos insertados', id });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al insertar', error: error.message });
    }
};

exports.commit = async (req, res) => {
    try {
        await commitTransaccion();
        res.json({ mensaje: 'Commit exitoso' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en commit', error: error.message });
    }
};

exports.rollback = async (req, res) => {
    try {
        await rollbackTransaccion();
        res.json({ mensaje: 'Rollback exitoso' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en rollback', error: error.message });
    }
};