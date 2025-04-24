const express = require('express');
const router = express.Router();
const abasController = require('../controllers/abasController');
const ganhosController = require('../controllers/ganhosController');
const gastosController = require('../controllers/gastosController');

router.post('/abas', abasController.criarAba);
router.get('/abas', abasController.listarAbas);
router.get('/abas/:id', abasController.buscarAba);
router.post('/ganhos', ganhosController.criarGanho);
router.get('/abas/:aba_id/ganhos', ganhosController.listarGanhos);
router.get('/abas/:aba_id/ganhos/total', ganhosController.calcularTotalGanhos);
router.post('/gastos', gastosController.criarGasto);
router.get('/abas/:aba_id/gastos', gastosController.listarGastos);
router.get('/abas/:aba_id/gastos/total', gastosController.calcularTotalGastos);
router.delete('/abas/:id', abasController.excluirAba);
router.delete('/ganhos/:id', ganhosController.excluirGanho);
router.delete('/gastos/:id', gastosController.excluirGasto);



module.exports = router;