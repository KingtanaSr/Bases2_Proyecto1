const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

async function login(req, res) {
  const { nombre_usuario, contraseña } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM usuarios WHERE nombre_usuario = :user AND contraseña = :pass`,
      [nombre_usuario, contraseña]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al conectar con la base de datos' });
  }
}

module.exports = { login };
