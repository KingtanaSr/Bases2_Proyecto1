// backend/controllers/updateController.js
const { getConnection } = require('../config/dbConfig');

const updateClient = async (req, res) => {
  const { cedula } = req.params;
  const { columna, nuevoDato } = req.body;

  // Validar que la columna es permitida
  const columnasPermitidas = ['nombre', 'cedula'];
  if (!columnasPermitidas.includes(columna)) {
    return res.status(400).json({ error: 'Columna no válida' });
  }

  try {
    const connection = await getConnection();

    // Construir la consulta dinámicamente con la columna segura
    const query = `UPDATE cliente SET ${columna} = :nuevoDato WHERE cedula = :cedulaBuscada`;

    const result = await connection.execute(
      query,
      {
        nuevoDato,
        cedulaBuscada: cedula
      },
      { autoCommit: true }
    );

    await connection.close();

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado con esa cédula' });
    }

    res.json({ message: 'Cliente actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente', details: error.message });
  }
};

module.exports = {
  updateClient
};
