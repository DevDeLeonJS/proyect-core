# SAIUT — Backend

API del proyecto SAIUT construida con Node.js y Express.

## Requisitos previos

- Node.js

## Instalación

```bash
npm install
```

## Desarrollo

Inicia el servidor con recarga automática (nodemon):

```bash
npm run dev
```

## Producción

```bash
npm start
```

El servidor queda corriendo en `http://localhost:3000` (o el puerto definido en `PORT`).

## Variables de entorno

Copia el archivo de ejemplo y ajústalo según tu entorno:

```bash
cp .env.example .env
```

| Variable | Descripción                  | Valor por defecto |
| -------- | ---------------------------- | ----------------- |
| `PORT`   | Puerto del servidor Express  | `3000`            |


## Integración con frontend

El frontend espera que la API esté disponible en `http://localhost:3000/api`.
Configura la URL en `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```
