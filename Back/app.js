const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/crearUsuarioRoutes');
const proveedorProductoRoutes = require('./routes/proveedorProductoRoutes');
const reportesRoutes = require('./routes/reportesRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', clientRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes)
app.use('/api', proveedorProductoRoutes);
app.use('/api/reportes', reportesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});