const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verificarToken } = require('../middleware/auth');

// Todas las rutas de alumnos requieren estar autenticado,
// igual que exige src/components/RutaProtegida/RutaProtegida.jsx en el frontend.
router.use(verificarToken);

// GET /api/alumnos
router.get('/alumnos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// GET /api/alumnos/:id
router.get('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM alumnos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el alumno' });
  }
});

// POST /api/alumnos
router.post('/alumnos', async (req, res) => {
  try {
    const { nombre, apellido, email, grado } = req.body;

    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'nombre, apellido y email son obligatorios' });
    }

    const result = await pool.query(
      `INSERT INTO alumnos (nombre, apellido, email, grado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, apellido, email, grado || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ya existe un alumno con ese email' });
    }
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

// PATCH /api/alumnos/:id
router.patch('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, grado } = req.body;

    const result = await pool.query(
      `UPDATE alumnos SET
        nombre = COALESCE($1, nombre),
        apellido = COALESCE($2, apellido),
        email = COALESCE($3, email),
        grado = COALESCE($4, grado)
       WHERE id = $5 RETURNING *`,
      [nombre, apellido, email, grado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el alumno' });
  }
});

// DELETE /api/alumnos/:id (extra, no usado por el frontend actual pero util para pruebas)
router.delete('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM alumnos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

module.exports = router;
