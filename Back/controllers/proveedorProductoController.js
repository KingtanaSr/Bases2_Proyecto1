const { getConnection } = require('../config/dbConfig');
const oracledb = require('oracledb');

const insertProveedorProducto = async (req, res) => {
  const { proveedor_id, producto_id } = req.body;

  try {
    const connection = await getConnection();
    await connection.execute(
      `INSERT INTO proveedor_producto (id_producto, id_proveedor)
       VALUES (:producto_id, :proveedor_id)`,
      {
        producto_id: Number(producto_id),
        proveedor_id: Number(proveedor_id),
      },
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Relación insertada con éxito' });
  } catch (error) {
    console.error('Error al insertar relación:', error);
    res.status(500).json({ error: 'Error al insertar relación', details: error.message });
  }
};

const getProveedorProducto = async (req, res) => {
  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `
      SELECT 
        p.nombre AS nombre_producto,
        pr.nombre AS nombre_proveedor
      FROM proveedor_producto pp
      JOIN producto p ON pp.id_producto = p.id_producto
      JOIN proveedor pr ON pp.id_proveedor = pr.id_proveedor
      `,
      [],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      }
    );

    console.log('Datos obtenidos de la base de datos:', result.rows);
    await connection.close();

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener relaciones proveedor-producto:', error);
    res.status(500).json({ error: 'Error al obtener datos', details: error.message });
  }
};

const updateProveedorProducto = async (req, res) => {
    const { id_producto, id_proveedor } = req.params;
    const { columna, nuevoDato } = req.body;
    console.log('Modificando relación:', { id_producto, id_proveedor, columna, nuevoDato });
    // Validar que la columna sea permitida
    const columnasPermitidas = ['id_producto', 'id_proveedor'];
    if (!columnasPermitidas.includes(columna)) {
      return res.status(400).json({ error: 'Columna no válida' });
    }
  
    try {
      const connection = await getConnection();
  
      // Construir la consulta con interpolación segura de la columna
      const query = `
        UPDATE proveedor_producto
        SET ${columna} = :nuevoDato
        WHERE id_producto = :id_producto AND id_proveedor = :id_proveedor
      `;
  
      const result = await connection.execute(
        query,
        {
          nuevoDato,
          id_producto,
          id_proveedor
        },
        { autoCommit: true }
      );
  
      await connection.close();
  
      if (result.rowsAffected === 0) {
        return res.status(404).json({ error: 'Relación no encontrada con esos IDs' });
      }
  
      res.json({ message: 'Relación actualizada con éxito' });
    } catch (error) {
      console.error('Error al actualizar relación:', error);
      res.status(500).json({ error: 'Error al actualizar relación', details: error.message });
    }
  };
  

const deleteProveedorProducto = async (req, res) => {
  const { id_producto, id_proveedor } = req.params;

  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `DELETE FROM proveedor_producto
       WHERE id_producto = :id_producto AND id_proveedor = :id_proveedor`,
      { id_producto, id_proveedor },
      { autoCommit: true }
    );
    await connection.close();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.json({ message: 'Relación eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar relación:', error);
    res.status(500).json({ error: 'Error al eliminar relación', details: error.message });
  }
};

module.exports = {
    insertProveedorProducto,
    getProveedorProducto,
    updateProveedorProducto,
    deleteProveedorProducto
  };