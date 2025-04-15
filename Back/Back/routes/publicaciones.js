const express = require('express');
const router = express.Router();
const { getPublications, getCollections, getPublicationsByCollection } = require('../controllers/publicacionesController');

/* Se definen las rutas para mostrar las colecciones y las publicaciones
según se pide en la funcionalidad 2 y 3. */ 
router.get('/publications', getPublications);
router.get('/collections', getCollections);
router.get('/publications_by_collection', getPublicationsByCollection);

module.exports = router;
