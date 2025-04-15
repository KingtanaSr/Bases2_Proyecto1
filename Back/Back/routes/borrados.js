const express = require('express');
const router = express.Router();
const { deletePublication } = require('../controllers/deleteController');

// Se define la ruta para eliminar la publicación
router.delete('/delete-publication/:id', deletePublication);

module.exports = router;
