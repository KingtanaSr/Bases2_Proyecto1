// backend/controllers/deleteController.js
const { getConnection } = require('../config/dbConfig');

const deleteClient = async (req, res) => {
  const { cedula } = req.params;

  try {
    const connection = await getConnection();

    const result = await connection.execute(
      `DELETE FROM cliente WHERE cedula = :cedula`,
      { cedula },
      { autoCommit: true }
    );

    await connection.close();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado con esa cédula' });
    }

    res.json({ message: 'Cliente eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente', details: error.message });
  }
};

module.exports = {
  deleteClient
};
