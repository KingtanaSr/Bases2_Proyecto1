const oracledb = require('oracledb');
const { getConnection } = require('../config/dbConfig');

// Reporte 1: Detalle de artículos vendidos por nombre de producto
const detalleArticulosVendidos = async (req, res) => {
  const { nombre_producto } = req.params;

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `
      SELECT 
          p.nombre AS producto,
          fp.cantidad,
          c.nombre AS cliente,
          s.nombre_facturacion AS sucursal,
          fv.fecha
      FROM producto p
      INNER JOIN fact_producto fp ON p.id_producto = fp.id_producto
      INNER JOIN factura_venta fv ON fp.id_factura = fv.id_factura
      INNER JOIN cliente c ON fv.id_cliente = c.id_cliente
      INNER JOIN sucursal s ON fv.id_sucursal = s.id_sucursal
      WHERE p.nombre = :nombre_producto
      `,
      { nombre_producto },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.error('Error en detalleArticulosVendidos:', err);
    res.status(500).json({ error: 'Error consultando artículos vendidos' });
  }
};

// Reporte 2: Total de ventas por provincia en un mes y año
const ventasPorProvincia = async (req, res) => {
  const { mes, anio } = req.query;

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `
      SELECT 
          prov.nombre_provincia,
          COUNT(fv.id_factura) AS total_ventas
      FROM provincias prov
      INNER JOIN cantones c ON prov.id_provincia = c.id_provincia
      INNER JOIN sucursal s ON s.id_canton = c.id_canton
      LEFT JOIN factura_venta fv 
        ON fv.id_sucursal = s.id_sucursal 
       AND EXTRACT(MONTH FROM fv.fecha) = :mes 
       AND EXTRACT(YEAR FROM fv.fecha) = :anio
      GROUP BY prov.nombre_provincia
      `,
      { mes: parseInt(mes), anio: parseInt(anio) },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    await connection.close();
    res.json(result.rows);
  } catch (err) {
    console.error('Error en ventasPorProvincia:', err);
    res.status(500).json({ error: 'Error consultando ventas por provincia' });
  }
};

module.exports = {
  detalleArticulosVendidos,
  ventasPorProvincia
};
