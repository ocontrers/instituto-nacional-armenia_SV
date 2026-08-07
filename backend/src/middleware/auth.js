const jwt = require('jsonwebtoken');

// Verifica que la peticion traiga un token valido en el header Authorization
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, email, rol }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido o expirado' });
  }
}

// Restringe el acceso a un rol especifico (ej: 'admin')
// El frontend lee el campo "rol" del payload del JWT (ver src/utils/jwt.js)
function requiereRol(rolRequerido) {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== rolRequerido) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta accion' });
    }
    next();
  };
}

module.exports = { verificarToken, requiereRol };
