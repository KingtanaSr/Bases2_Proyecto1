// backend/controllers/insertController.js
const { getConnection } = require('../config/dbConfig');

const insertClient = async (req, res) => {
  const { nombre, cedula } = req.body;

  try {
    const connection = await getConnection();

    await connection.execute(
      `INSERT INTO cliente (nombre, cedula) VALUES (:nombre, :cedula)`,
      { nombre, cedula },
      { autoCommit: true }
    );

    await connection.close();

    res.status(201).json({ message: 'Cliente insertado con éxito' });
  } catch (error) {
    console.error('Error al insertar cliente:', error);
    res.status(500).json({ error: 'Error al insertar cliente', details: error.message });
  }
};

module.exports = {
  insertClient
};
