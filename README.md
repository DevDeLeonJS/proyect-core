# SAIUT

## Desarrollo

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```

## Integración con backend

El frontend mantiene los datos simulados en `src/data/mockData.ts` hasta que se
defina el stack del backend. La capa `src/services/apiClient.ts` centraliza las
solicitudes HTTP sin acoplar el proyecto a un framework, ORM o proveedor de base
de datos.

Configura la URL del backend con un archivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

Cuando se definan los endpoints, cada dominio puede crear servicios pequeños que
usen `request<T>()` y los contratos de `src/types`.
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



