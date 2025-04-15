// backend/controllers/selectController.js
const { getConnection } = require('../config/dbConfig');
  console.log('Solicitud recibida en /api/clientes');
  
const getClients = async (req, res) => {
  try {
    const connection = await getConnection();

    const result = await connection.execute(`SELECT * FROM cliente`, [], {
      outFormat: require('oracledb').OUT_FORMAT_OBJECT,
    });

    await connection.close();

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
  }
};

module.exports = {
  getClients
};
