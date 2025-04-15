const { getConnection } = require('./config/dbConfig');

(async () => {
  try {
    const connection = await getConnection();
    console.log('¡Conexión exitosa a Oracle!');
    const result = await connection.execute('SELECT * FROM producto');
    console.log(result.rows);
    await connection.close();
  } catch (err) {
    console.error('Error de conexión:', err);
  }
})();