const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.post('/transaccion/iniciar', controller.iniciar);
router.post('/transaccion/insertar', controller.insertar);
router.post('/transaccion/commit', controller.commit);
router.post('/transaccion/rollback', controller.rollback);

module.exports = router;