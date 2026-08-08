const { Pool } = require('pg');
require('dotenv').config();

// El uso de SSL depende de DB_SSL, NO de NODE_ENV.
// Postgres local (docker-compose, desarrollo) no soporta SSL.
// Activa DB_SSL=true solo cuando la base de datos este en un proveedor
// cloud que lo requiera (ej: Render con conexion externa, Cloud SQL con SSL forzado).
const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL:', err);
});

module.exports = pool;
