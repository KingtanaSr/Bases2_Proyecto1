const { getConnection } = require('../config/dbConfig');

const loginUser = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT * FROM usuarios WHERE nombre_usuario = :usuario`,
      [nombre_usuario],
      { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const usuario = result.rows[0];
    if (usuario.CONTRASEÑA !== contraseña) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si todo está bien, enviamos éxito
    res.json({ mensaje: 'Inicio de sesión exitoso', usuario: usuario.NOMBRE_USUARIO });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor', detalles: error.message });
  }
};

module.exports = {
  loginUser,
};
