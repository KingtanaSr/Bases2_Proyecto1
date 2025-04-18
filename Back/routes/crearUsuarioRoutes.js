// routes/crearUsuarioRoutes.js
const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/crearUsuarioController');

router.post('/usuarios', crearUsuario);

module.exports = router;
