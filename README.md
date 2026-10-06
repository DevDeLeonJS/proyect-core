# SAIUT

Sistema académico integral para la gestión de la experiencia estudiantil: login y
registro de usuarios, dashboard con resumen general, clases, actividades,
calificaciones y pagos.

El repositorio está organizado como un monorepo con dos proyectos:

| Carpeta     | Descripción                                  | Más detalles                            |
| ----------- | -------------------------------------------- | --------------------------------------- |
| `frontend/` | SPA de interfaces (wireframes de SAIUT)     | [frontend/README.md](frontend/README.md) |
| `backend/`  | API HTTP base del sistema                    | [backend/README.md](backend/README.md)   |

## Tecnologías

### Frontend

- [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) 8 como bundler y servidor de desarrollo
- [Tailwind CSS](https://tailwindcss.com) 4 para estilos
- [lucide-react](https://lucide.dev) para iconos
- [ESLint](https://eslint.org) para linting

### Backend

- [Node.js](https://nodejs.org) + [Express](https://expressjs.com) 5
- [cors](https://www.npmjs.com/package/cors) para compartir recursos
- [dotenv](https://www.npmjs.com/package/dotenv) para variables de entorno
- [nodemon](https://nodemon.io) para recarga automática en desarrollo

## Requisitos previos

- [Node.js](https://nodejs.org) (versión LTS)
- npm (incluido con Node.js)
- [Git](https://git-scm.com)

## Cómo levantar el proyecto

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El servidor queda corriendo en `http://localhost:3000` (puerto configurable con
`PORT` en `backend/.env`).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Para conectar el frontend con la API, define la URL en `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Scripts disponibles

### Frontend (`cd frontend`)

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR           |
| `npm run build`   | Compilación de tipos + build de producción |
| `npm run lint`    | Ejecuta ESLint                          |
| `npm run preview` | Previsualiza el build de producción      |

### Backend (`cd backend`)

| Comando         | Descripción                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor con recarga (nodemon)     |
| `npm start`     | Servidor en modo producción        |

## Para el desarrollador

Requisitos breves para contribuir:

- **Frontend**: conocimientos de React, TypeScript y Tailwind CSS. Las vistas
  viven en `frontend/src/views`, los componentes compartidos en
  `frontend/src/components` y los contratos de datos en `frontend/src/types`.
- **Backend**: conocimientos de Node.js y Express. El servidor inicia en
  `backend/src/index.js`; cada dominio puede agregar sus rutas/servicios usando
  `request<T>()` desde el frontend (`frontend/src/services/apiClient.ts`).

### Flujo de trabajo

1. Crea una rama por feature: `git checkout -b feature/SAIUT-XX-descripcion`.
2. Haz commits con el prefijo del ticket: `SAIUT-XX: descripción del cambio`.
3. Abre un Pull Request hacia `main` para revisión.
4. Verifica antes de push: `npm run lint` y `npm run build` en `frontend/`.
