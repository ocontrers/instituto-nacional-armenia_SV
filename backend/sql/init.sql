-- Tabla de usuarios (login / roles)
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL DEFAULT 'DOCENTE',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de alumnos
CREATE TABLE IF NOT EXISTS alumnos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  apellido VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  grado VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usuario admin de ejemplo
-- Email: admin@institutonacionalarmenia.edu.sv
-- Password: Admin123!  (cambia esta contraseña antes de usar en un entorno real)
INSERT INTO usuarios (nombre, email, password_hash, rol)
VALUES (
  'Administrador',
  'admin@institutonacionalarmenia.edu.sv',
  '$2a$10$8HLgNYFDH3snAKB3dP6QbOBhJXaBH4z4L3fKW.NM8keywc5rtxRDu',
  'ADMIN'
)
ON CONFLICT (email) DO NOTHING;

-- Alumnos de ejemplo
INSERT INTO alumnos (nombre, apellido, email, grado) VALUES
  ('Ana', 'Martinez', 'ana.martinez@institutonacionalarmenia.edu.sv', '9no'),
  ('Luis', 'Perez', 'luis.perez@institutonacionalarmenia.edu.sv', '8vo')
ON CONFLICT (email) DO NOTHING;
