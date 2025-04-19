const express = require('express');
const router = express.Router();
const {
  detalleArticulosVendidos,
  ventasPorProvincia
} = require('../controllers/reportesController');

router.get('/detalle-producto/:nombre_producto', detalleArticulosVendidos);
router.get('/ventas-provincia', ventasPorProvincia);

module.exports = router;
