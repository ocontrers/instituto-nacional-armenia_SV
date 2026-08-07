# Instituto Nacional de Armenia — Proyecto Full Stack (DevOps / CI-CD)

Sistema de gestión de alumnos compuesto por:

- **Frontend**: React + Vite (carpeta raíz `/`)
- **Backend**: API REST con Express + PostgreSQL (carpeta `/backend`)

Actividad *"API en Producción con DevOps y CI/CD"*:
variables de entorno, monitoreo (`/health`), plan de backups, despliegue en la nube
y pipeline de CI/CD automatizado.

## Estructura del proyecto

```
.
├── src/                    # Código del frontend (React)
├── Dockerfile               # Docker del frontend (build + nginx)
├── docker-compose.yml        # Orquesta frontend + backend + PostgreSQL
├── .github/workflows/ci-cd.yml
├── docs/PLAN_DE_BACKUPS.md
├── MANUAL_DE_CUMPLIMIENTO.md
└── backend/
    ├── src/                 # Código del backend (Express)
    ├── sql/init.sql         # Esquema + datos de ejemplo
    ├── Dockerfile
    └── .env.example
```

## Requisitos previos

- Node.js 18+
- Docker y Docker Compose
- Una cuenta en Render, Railway u otra plataforma cloud (para el despliegue)

## Levantar todo el proyecto con Docker (recomendado)

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3000
- Health check: http://localhost:3000/health
- PostgreSQL: localhost:5432 (usuario/clave: postgres/postgres)

El archivo `backend/sql/init.sql` se ejecuta automáticamente al crear el contenedor
de PostgreSQL por primera vez, creando las tablas y un usuario admin de prueba:

```
Email: admin@institutonacionalarmenia.edu.sv
Password: Admin123!
```

## Ejecutar cada parte por separado (sin Docker)

### Backend

```bash
cd backend
cp .env.example .env    # y edita las variables según tu entorno
npm install
npm run dev
```

### Frontend

```bash
cp .env.example .env    # y edita VITE_API_URL apuntando a tu backend
npm install
npm run dev
```

## Endpoints del backend

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/health` | Estado de la API y la BD | No |
| POST | `/api/auth/login` | Login, devuelve JWT | No |
| GET | `/api/auth/usuarios` | Lista de usuarios | Sí (rol admin) |
| GET | `/api/alumnos` | Lista de alumnos | Sí |
| GET | `/api/alumnos/:id` | Detalle de un alumno | Sí |
| POST | `/api/alumnos` | Crear alumno | Sí |
| PATCH | `/api/alumnos/:id` | Editar alumno | Sí |
| DELETE | `/api/alumnos/:id` | Eliminar alumno | Sí |

## Variables de entorno

Ver `backend/.env.example` y `.env.example` (frontend). Ninguna credencial
va escrita en el código fuente; todo se lee desde variables de entorno.

## CI/CD

El workflow `.github/workflows/ci-cd.yml` corre en cada push a `main`:
instala dependencias, valida sintaxis, hace build del frontend, construye
las imágenes Docker y dispara el despliegue automático en la plataforma cloud
mediante *deploy hooks* (ver `MANUAL_DE_CUMPLIMIENTO.md` para configurarlos).

## Plan de backups

Ver `docs/PLAN_DE_BACKUPS.md`.

## Creado por.

Docentes Tecnicos:
Contreras Rivera Milton Antonio
Vasquez Ena Lili
Perez Zacapa Gloria Susana
Contreras Alvarez Oscar Armando
