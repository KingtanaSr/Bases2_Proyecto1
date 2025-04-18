// controllers/crearUsuarioController.js
const { getConnection } = require('../config/dbConfig');

const crearUsuario = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const connection = await getConnection();

    await connection.execute(
      `INSERT INTO usuarios (nombre_usuario, contraseña) VALUES (:nombre_usuario, :contraseña)`,
      { nombre_usuario, contraseña },
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario, nombre de usuario en uso' });
  }
};

module.exports = { crearUsuario };
