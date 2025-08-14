const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.post('/transaccion/cambiarNivel', controller.cambiarAislamiento);
router.post('/transaccion/obtenerNivel', controller.obtenerAislamiento);
router.post('/transaccion/iniciar', controller.iniciar);
router.post('/transaccion/insertar', controller.insertar);
router.get('/transaccion/leer', controller.leer);
router.put('/transaccion/actualizar', controller.actualizar);
router.delete('/transaccion/eliminar/:id', controller.eliminar);
router.post('/transaccion/commit', controller.commit);
router.post('/transaccion/rollback', controller.rollback);

module.exports = router;