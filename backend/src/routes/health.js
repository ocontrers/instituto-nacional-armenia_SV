const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * GET /health
 * Endpoint de monitoreo: confirma que la API esta viva
 * y que la conexion a PostgreSQL funciona.
 */
router.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: 'unknown',
  };

  try {
    await pool.query('SELECT 1');
    health.database = 'connected';
    return res.status(200).json(health);
  } catch (err) {
    health.status = 'error';
    health.database = 'disconnected';
    health.error = err.message;
    return res.status(503).json(health);
  }
});

module.exports = router;
