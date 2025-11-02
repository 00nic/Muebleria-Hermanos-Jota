E-commerce Mueblería Hermanos Jota — Backend

Este repositorio contiene el backend de la aplicación (API REST con Node.js, Express y MongoDB/Mongoose).

Sitios desplegados

- Frontend (Vercel):
- API Backend (Render): https://muebleria-hermanos-jota-0o5z.onrender.com

Requisitos previos

- Node.js LTS 18+ (o superior)
- Una base de datos MongoDB accesible (Atlas o local)

Variables de entorno
El backend utiliza dotenv. Crea un archivo `.env` en la carpeta `backend` a partir del ejemplo `.env.example`:

DB_CONNECTION_STRING=mongodb+srv://usuario:password@cluster/dbname?retryWrites=true&w=majority
PORT=3001

Descripción:

- DB_CONNECTION_STRING: cadena de conexión de MongoDB.
- PORT: puerto donde se levantará el servidor local (por defecto 3001 si no se define).

Instalación y ejecución local

1. Instalar dependencias
   cd backend
   npm install

2. Ejecutar en modo desarrollo (con nodemon)
   npm run dev

3. Ó ejecutar en modo producción local
   npm start

4. Servidor en ejecución
   - URL local por defecto: http://localhost:3001
   - Endpoint raíz: GET /
   - Salud básica: devuelve "¡Bienvenido al servidor de Mueblería Jota!"

Endpoints principales (Productos)

- GET /api/productos → lista todos los productos
- GET /api/productos/:id → obtiene un producto por id
- POST /api/productos → crea un producto
- PUT /api/productos/:id → actualiza un producto
- DELETE /api/productos/:id → elimina un producto

Estructura del proyecto (carpetas clave)

- src/
  - server.js → configuración de Express, middlewares, rutas y arranque
  - db.js → conexión a MongoDB (Mongoose)
  - utils/config.js → lectura de variables de entorno (dotenv)
  - routes/ → definición de rutas Express (productos, usuarios)
  - controllers/ → controladores (lógica de negocio por recurso)
  - models/ → modelos Mongoose (Product)
  - middlewares/ → logger, manejo de 404 y manejador centralizado de errores

Decisiones/arquitectura

- Separación por capas: rutas → controladores → modelo. Esto permite escalar y testear más fácilmente.
- Conexión a DB aislada en `db.js` para desacoplar el arranque del servidor.
- Manejo centralizado de errores y 404 mediante middlewares dedicados.
- Variables de entorno gestionadas con dotenv (`utils/config.js`).

Despliegue (Render)

1. Crear servicio Web en Render apuntando a este proyecto (directorio `backend`).
2. Comando de arranque: `npm start` (Render ejecuta `npm install` automáticamente).
3. Variables de entorno en Render:
   - DB_CONNECTION_STRING: cadena MongoDB
   - PORT: Render suele proporcionarlo, pero mantener fallback en `config.port` no rompe nada.
4. Tras el despliegue, toma la URL pública de Render y actualiza este README y/o el frontend con la `API_BASE_URL` si fuese necesario.

Colaboradores

- Elliot Alejandro Contreras (https://github.com/ElliotLSI)
- Nahuel Cordero (https://github.com/nahhhu)
- Gael Ferrari (https://github.com/gaelferrari)
- Alvaro Ibarra (https://github.com/Ibarra1812)
- Nicolás Gonzalez (https://github.com/00nic)
