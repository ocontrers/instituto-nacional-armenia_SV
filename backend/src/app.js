const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const alumnosRoutes = require('./routes/alumnos');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Instituto Nacional de Armenia',
    endpoints: ['/health', '/api/auth/login', '/api/auth/usuarios', '/api/alumnos'],
  });
});

// Monitoreo en la raiz (convencion estandar: GET /health)
app.use('/', healthRoutes);

// Rutas de negocio bajo /api, tal como espera VITE_API_URL del frontend
app.use('/api', authRoutes);
app.use('/api', alumnosRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
