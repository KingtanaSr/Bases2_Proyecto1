const express = require('express'); 
const router = express.Router();
const oracledb = require('oracledb');
const {
  insertProveedorProducto,
  getProveedorProducto,
  updateProveedorProducto,
  deleteProveedorProducto
} = require('../controllers/proveedorProductoController');

const { getConnection } = require('../config/dbConfig');

// Obtener lista de proveedores
router.get('/proveedores', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT ID_PROVEEDOR, NOMBRE FROM PROVEEDOR',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener proveedores', err);
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// Obtener lista de productos
router.get('/productos', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT ID_PRODUCTO, NOMBRE FROM PRODUCTO',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/relaciones-proveedor-producto', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT 
         pp.id_producto,
         pp.id_proveedor,
         p.nombre AS nombre_producto,
         pr.nombre AS nombre_proveedor
       FROM proveedor_producto pp
       JOIN producto p ON pp.id_producto = p.id_producto
       JOIN proveedor pr ON pp.id_proveedor = pr.id_proveedor`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener relaciones proveedor-producto', err);
    res.status(500).json({ error: 'Error al obtener relaciones' });
  }
});

// CRUD relaciones
router.post('/proveedor-producto', insertProveedorProducto);
router.get('/proveedor-productos', getProveedorProducto);
router.put('/proveedor-producto/:id_producto/:id_proveedor', updateProveedorProducto);
router.delete('/proveedor-producto/:id_producto/:id_proveedor', deleteProveedorProducto);

module.exports = router;

