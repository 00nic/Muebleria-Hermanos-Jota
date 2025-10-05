# E-commerce Mueblería Hermanos Jota

## Integrantes

- Elliot Alejandro Contreras - [GitHub](https://github.com/ElliotLSI)
- Nahuel Cordero - [GitHub](https://github.com/nahhhu)
- Gael Ferrari - [GitHub](https://github.com/gaelferrari)
- Alvaro Ibarra - [GitHub](https://github.com/Ibarra1812)
- Nicolás Gonzalez - [GitHub](https://github.com/00nic)

## Descripción del Proyecto

Aplicación web de e-commerce para la venta de muebles artesanales. El proyecto consiste en un catálogo interactivo donde los usuarios pueden explorar productos, ver detalles de cada artículo, agregar productos al carrito de compras y enviar consultas mediante un formulario de contacto.

## Instalación y Configuración

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

El proyecto está dividido en dos partes: frontend (client) y backend. Ambas deben instalarse por separado.

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd client
npm install
```

### Ejecutar el Proyecto

Una vez instaladas las dependencias, se deben correr ambos servidores en terminales separadas.

#### Iniciar el Backend

```bash
cd backend
npm run dev
```

El servidor backend correrá en `http://localhost:3001` (puerto configurable en el archivo .env)

#### Iniciar el Frontend

```bash
cd client
npm start
```

La aplicación React se abrirá automáticamente en `http://localhost:3000`

## Arquitectura del Proyecto

### Frontend (client/)

El frontend está desarrollado con React y sigue una estructura de componentes modulares. La aplicación maneja el estado global mediante hooks de React (useState, useEffect) sin necesidad de librerías adicionales de gestión de estado.

**Estructura principal:**

- `/src/components`: Componentes reutilizables (NavBar, Footer, ProductCard, Cart, etc.)
- `/src/service`: Capa de servicios para comunicación con el backend
- `/src/assets`: Imágenes de productos
- `App.css`: Estilos globales con variables CSS y media queries para diseño responsive

**Decisiones de diseño:**

- Se optó por usar CSS vanilla con variables personalizadas en lugar de frameworks como Bootstrap o Tailwind para tener mayor control sobre el diseño y aprender los fundamentos.
- El manejo del carrito se realiza completamente en el cliente, guardando el estado en memoria (sin persistencia).
- Se implementó un sistema de notificaciones temporal para feedback del usuario.

### Backend (backend/)

El backend está construido con Node.js y Express, siguiendo una arquitectura de capas simple pero escalable.

**Estructura principal:**

- `/src/routes`: Definición de endpoints de la API
- `/src/data`: Datos del catálogo (simulación de base de datos)
- `/src/middlewares`: Middlewares personalizados (logger, manejo de errores, rutas no encontradas)
- `server.js`: Punto de entrada de la aplicación

**Decisiones técnicas:**

- Se utiliza un array en memoria para almacenar el catálogo de productos (sin base de datos) para simplificar el desarrollo inicial.
- CORS configurado para permitir requests desde el frontend en desarrollo. El uso del CORS fue temporal, ya que en ultimo momento usamos un proxy en el package.json del cliente: `"proxy": "http://localhost:3001"`.
- dotenv para manejar variables de entorno como el puerto del servidor.
- Middleware de logging personalizado para trackear requests.
- Manejo centralizado de errores para respuestas consistentes.

## Tecnologías Utilizadas

### Frontend

- React
- JavaScript
- CSS3 (variables, flexbox, grid, media queries)
- HTML5

### Backend

- Node.js
- Express
- CORS (Uso temporal en el desarrollo)
- proxy: "http://localhost:3001" (configuración en package.json del cliente para evitar problemas de CORS)
- dotenv (manejo de variables de entorno)

### Herramientas de Desarrollo

- Nodemon (auto-restart del servidor)
- Create React App
- Git
- Trello (organización de sprints y tareas del equipo)

## Notas Adicionales

- El proyecto incluye diseño responsive optimizado para desktop, tablets y móviles.
- Las imágenes de productos están alojadas localmente en la carpeta `client/src/assets/productos`.
- El backend expone endpoints RESTful para obtener el catálogo de productos y manejar consultas de usuarios.

### Posibles errores

- Si el backend no inicia correctamente, asegúrate de que el puerto 3001 esté libre o cambia el puerto en el archivo `.env`.
- Si el frontend no puede conectarse al backend, verifica que ambos servidores estén corriendo y que la configuración del proxy en `package.json` del cliente sea correcta.
- En caso de problemas con las imágenes, asegúrate de que las rutas en `ProductCard.js` apunten correctamente a la carpeta `assets`.
- Si aparece el error `options.allowedHosts[0] should be a non-empty string` al ejecutar `npm start`, agrega `DANGEROUSLY_DISABLE_HOST_CHECK=true` en el archivo `client/.env` para deshabilitar la verificación de host en desarrollo local. Esto es necesario debido a cambios en las políticas de seguridad de Webpack Dev Server en versiones recientes.
