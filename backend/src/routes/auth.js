const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../db');
const { verificarToken, requiereRol } = require('../middleware/auth');

// POST /api/auth/login
// El frontend (src/services/authService.js) envia { email, password }
// y espera recibir un objeto con el token JWT.
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email y password son obligatorios' });
    }

    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesion' });
  }
});

// GET /api/auth/usuarios (protegido, solo admin)
// Usado por src/pages/PaginaUsuarios del frontend.
router.get('/auth/usuarios', verificarToken, requiereRol('ADMIN'), async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, email, rol, created_at FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

module.exports = router;
