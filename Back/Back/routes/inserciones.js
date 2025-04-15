const express = require('express');
const router = express.Router();
const { insertPublication } = require('../controllers/insertController');

// Se define la ruta para manejar la inserción de publicaciones
router.post('/publicaciones', insertPublication);
  
module.exports = router;