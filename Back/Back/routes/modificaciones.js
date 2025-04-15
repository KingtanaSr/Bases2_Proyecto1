const express = require('express');
const router = express.Router();
const { updatePublication } = require('../controllers/modifyController');

// Se define la ruta para modificar las publicaciones.
router.put('/update-publication', updatePublication);

module.exports = router;