const {
  cambiarNivelAislamiento,
  obtenerNivelAislamiento,
  iniciarTransaccion,
  leerTransaccion,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  commitTransaccion,
  rollbackTransaccion
} = require('../services/transactionService');


function getSid(req) {
  const viaBody = req.body?.sid;
  const viaQuery = req.query?.sid;
  const viaHeader = req.headers['x-sid'];
  if (viaBody) return String(viaBody);
  if (viaQuery) return String(viaQuery);
  if (viaHeader) return String(viaHeader);

  const origin = req.headers.origin || '';
  if (origin.includes('http://localhost:3000')) return 'A';
  if (origin.includes('http://localhost:3001')) return 'B';
  return 'A'; // default
}

exports.cambiarAislamiento = async (req, res) => {
  try {
    await cambiarNivelAislamiento(req.body.nivel, getSid(req));
    res.json({ ok: true, mensaje: 'Nivel de aislamiento cambiado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar nivel de aislamiento', error: error.message });
  }
};

exports.obtenerAislamiento = async (req, res) => {
  try {
    const level = await obtenerNivelAislamiento(getSid(req));
    res.json(level);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener nivel de aislamiento', error: error.message });
  }
};

exports.iniciar = async (req, res) => {
  try {
    await iniciarTransaccion(getSid(req));
    res.json({ ok: true, mensaje: 'Transacción iniciada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar transacción', error: error.message });
  }
};

exports.leer = async (req, res) => {
  try {
    const rows = await leerTransaccion(getSid(req));
    res.json(rows);
  } catch (error) {
    const status = /No hay una transacción activa/i.test(error.message) ? 409 : 500;
    res.status(status).json({ ok: false, error: error.message });
  }
};

exports.insertar = async (req, res) => {
  try {
    const id = await insertarUsuario(req.body.nombre, req.body.apellido, getSid(req));
    res.json({ ok: true, mensaje: 'Datos insertados', id });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al insertar', error: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const r = await actualizarUsuario(req.body.id, req.body.nombre, getSid(req));
    res.json({ ok: true, mensaje: 'Datos actualizados', result: r });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error actualizar usuario', error: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const r = await eliminarUsuario(req.params.id, getSid(req));
    res.json({ ok: true, mensaje: 'Usuario eliminado', result: r });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
  }
};

exports.commit = async (req, res) => {
  try {
    await commitTransaccion(getSid(req));
    res.json({ ok: true, mensaje: 'Commit realizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en commit', error: error.message });
  }
};

exports.rollback = async (req, res) => {
  try {
    await rollbackTransaccion(getSid(req));
    res.json({ ok: true, mensaje: 'Rollback realizado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en rollback', error: error.message });
  }
};
