// backend/routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const { insertClient } = require('../controllers/insertController');
const { updateClient } = require('../controllers/updateController');
const { deleteClient } = require('../controllers/deleteController');
const { getClients } = require('../controllers/selectController');

// CRUD rutas
router.post('/cliente', insertClient);
router.put('/cliente/cedula/:cedula', updateClient);
router.delete('/cliente/cedula/:cedula', deleteClient);
router.get('/clientes', getClients);

module.exports = router;
