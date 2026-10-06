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
