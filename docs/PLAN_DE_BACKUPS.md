# Plan de Backups — API Instituto Nacional de Armenia

## 1. Información que será respaldada

- Base de datos PostgreSQL completa (`instituto_nacional_armenia`), incluyendo las tablas:
  - `usuarios` (cuentas de acceso y roles)
  - `alumnos` (registros académicos)
- Archivo `.env` de configuración de producción, almacenado de forma cifrada y **separado del repositorio** (nunca en GitHub).
- Código fuente: ya está versionado en GitHub, por lo que su historial actúa como respaldo adicional.

## 2. Frecuencia de los respaldos

| Tipo de respaldo | Frecuencia | Retención |
|---|---|---|
| Backup completo (`pg_dump`) | Diario, automático (madrugada) | 7 días |
| Backup completo semanal | Cada domingo | 4 semanas |
| Backup manual | Antes de cada despliegue a producción o migración de esquema | Hasta el siguiente backup diario |

## 3. Lugar de almacenamiento

- **Backups automáticos de la plataforma cloud**: si se usa Render o Railway, se habilita el backup automático de PostgreSQL que ofrece el plan (retención según el proveedor).
- **Copia externa**: los dumps (`.sql` o `.dump`) se suben adicionalmente a un bucket de almacenamiento en la nube (por ejemplo, Google Drive o un bucket S3/GCS del equipo), en una carpeta `backups/instituto-nacional-armenia/` organizada por fecha (`YYYY-MM-DD`).
- Los backups nunca se almacenan en el mismo repositorio de GitHub del proyecto.

## 4. Procedimiento para generar un backup manual

```bash
# Backup completo de la base de datos
pg_dump "$DATABASE_URL" -F c -f backup_instituto_nacional_armenia_$(date +%Y%m%d).dump
```

## 5. Procedimiento de recuperación ante fallos

1. Detener temporalmente el backend (o ponerlo en modo mantenimiento) para evitar escrituras durante la restauración.
2. Crear (o vaciar) la base de datos de destino:
   ```bash
   dropdb instituto_nacional_armenia   # solo si se restaura sobre una BD existente
   createdb instituto_nacional_armenia
   ```
3. Restaurar el dump más reciente:
   ```bash
   pg_restore -d "$DATABASE_URL" backup_instituto_nacional_armenia_YYYYMMDD.dump
   ```
4. Verificar la integridad de los datos con consultas de control:
   ```sql
   SELECT COUNT(*) FROM usuarios;
   SELECT COUNT(*) FROM alumnos;
   ```
5. Confirmar que el endpoint `/health` responde `"database": "connected"`.
6. Reactivar el backend y monitorear logs durante los primeros 30 minutos.

## 6. Responsable y revisión

- Responsable del plan: equipo de desarrollo del proyecto (los 3 integrantes del grupo).
- Este documento se revisa y actualiza cada vez que cambie el esquema de la base de datos o el proveedor de hosting.
