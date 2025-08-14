const pool = require('../config/db');

const sesiones = new Map();

async function initTxFlag(conn) {
  await conn.query('SET @__tx := IFNULL(@__tx, 0);');
}

async function getConn(sid = 'A') {
  if (!sesiones.has(sid)) {
    const conn = await pool.getConnection();
    await conn.query('SET SESSION autocommit = 1;');
    await initTxFlag(conn);
    sesiones.set(sid, conn);
  }
  return sesiones.get(sid);
}

async function tieneTxActiva(conn) {
  const [rows] = await conn.query('SELECT IFNULL(@__tx, 0) AS tx;');
  return Number(rows[0].tx) === 1;
}


async function cambiarNivelAislamiento(nivel, sid = 'A') {
  const conn = await getConn(sid);
  if (nivel === '1') {
    await conn.query('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;');
  } else if (nivel === '2') {
    await conn.query('SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;');
  } else if (nivel === '3') {
    await conn.query('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;');
  } else if (nivel === '4') {
    await conn.query('SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;');
  } else {
    throw new Error('Nivel de aislamiento inválido');
  }
}

async function obtenerNivelAislamiento(sid = 'A') {
  const conn = await getConn(sid);
  const [rows] = await conn.query('SELECT @@transaction_isolation;'); 
  return rows[0]['@@transaction_isolation'];
}

async function iniciarTransaccion(sid = 'A') {
  const conn = await getConn(sid);
  if (await tieneTxActiva(conn)) throw new Error('Ya hay una transacción activa');
  await conn.beginTransaction();
  await conn.query('SET @__tx := 1;');
}

async function leerTransaccion(sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  const [rows] = await conn.query('SELECT * FROM usuario;');
  return rows;
}

async function insertarUsuario(nombre, apellido, sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  const [result] = await conn.query(
    'INSERT INTO usuario (nombre, apellido) VALUES (?, ?);',
    [nombre, apellido]
  );
  return result.insertId;
}

async function actualizarUsuario(id, nombre, sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  const [result] = await conn.query(
    'UPDATE usuario SET nombre = ? WHERE id = ?;',
    [nombre, id]
  );
  return result;
}

async function eliminarUsuario(id, sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  const [result] = await conn.query('DELETE FROM usuario WHERE id = ?;', [id]);
  return result;
}

async function commitTransaccion(sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  try {
    await conn.commit();
    await conn.query('SET @__tx := 0;'); 
  } finally {
    conn.release();
    sesiones.delete(sid);
  }
}

async function rollbackTransaccion(sid = 'A') {
  const conn = await getConn(sid);
  if (!(await tieneTxActiva(conn))) throw new Error('No hay una transacción activa');
  try {
    await conn.rollback();
    await conn.query('SET @__tx := 0;'); 
  } finally {
    conn.release();
    sesiones.delete(sid);
  }
}

module.exports = {
  cambiarNivelAislamiento,
  obtenerNivelAislamiento,
  iniciarTransaccion,
  leerTransaccion,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  commitTransaccion,
  rollbackTransaccion,
};
