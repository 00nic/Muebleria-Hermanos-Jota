# E-commerce Mueblería Hermanos Jota

Aplicación web full-stack de e-commerce para la venta de muebles artesanales, implementada como una Single Page Application (SPA) con arquitectura cliente-servidor separada.

## Sitios desplegados

- **Frontend (Vercel)**: https://muebleria-hermanos-jota-omega.vercel.app
- **API Backend (Render)**: https://muebleria-hermanos-jota-0o5z.onrender.com

---

## Descripción del proyecto

Sistema de comercio electrónico que permite a los usuarios explorar un catálogo de productos, visualizar detalles individuales, gestionar un carrito de compras en memoria, y enviar consultas mediante un formulario de contacto. El proyecto implementa operaciones CRUD completas sobre el catálogo de productos con persistencia en MongoDB.

**Funcionalidades principales:**

- Catálogo de productos con grid responsive
- Sistema de detalle de producto con imágenes locales y remotas
- Carrito de compras con gestión de cantidades (agregar, incrementar, decrementar, eliminar)
- Formulario de contacto
- Panel de administración para creación y eliminación de productos
- Sistema de notificaciones toast persistentes entre navegaciones
- Manejo de estados de carga y errores con feedback visual

---

## Arquitectura general

El proyecto sigue una arquitectura cliente-servidor desacoplada, con comunicación exclusivamente mediante API REST. Ambas aplicaciones son independientes y pueden desplegarse en infraestructuras separadas.

### Stack tecnológico

**Frontend:**

- React 19.1.1 (Create React App)
- React Router DOM 7.9.5
- CSS3 vanilla con variables personalizadas
- Fetch API para requests HTTP

**Backend:**

- Node.js con Express 5
- MongoDB con Mongoose ODM
- dotenv para configuración de entorno
- Middlewares personalizados (logger, error handler, 404 handler)

**DevOps:**

- Frontend desplegado en Vercel
- Backend desplegado en Render
- Base de datos MongoDB Atlas

### Estructura del monorepo

```
/
├── client/              # Aplicación React (frontend)
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Componentes de página
│   │   ├── hooks/       # Custom hooks (useCart, useProducts, etc.)
│   │   ├── service/     # Capa de servicio (API calls)
│   │   └── utils/       # Utilidades (formateo, helpers)
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── backend/             # API REST (Node.js/Express)
│   ├── src/
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── models/      # Modelos Mongoose
│   │   ├── routes/      # Definición de endpoints
│   │   ├── middlewares/ # Middlewares personalizados
│   │   └── utils/       # Config y utilidades
│   ├── .env.example
│   └── package.json
│
└── README.md            # Documentación general (este archivo)
```

---

## Instalación y configuración

### Requisitos previos

- Node.js LTS 18+ (o superior)
- npm o yarn
- MongoDB accesible (MongoDB Atlas o instancia local)

### Configuración de variables de entorno

Ambas aplicaciones requieren configuración de entorno mediante archivos `.env`.

#### Backend (`backend/.env`):

```properties
DB_CONNECTION_STRING=mongodb+srv://usuario:password@cluster/dbname?retryWrites=true&w=majority
PORT=3001
```

#### Frontend (`client/.env`):

```properties
DANGEROUSLY_DISABLE_HOST_CHECK=true
REACT_APP_API_URL=https://muebleria-hermanos-jota-0o5z.onrender.com/api/productos
```

**Nota:** En desarrollo local con proxy, `REACT_APP_API_URL` puede omitirse. El `package.json` del cliente incluye `"proxy": "http://localhost:3001"` para evitar problemas de CORS en desarrollo.

### Instalación de dependencias

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### Ejecución en desarrollo local

Ambos servidores deben ejecutarse en terminales separadas.

**Backend (puerto 3001):**

```bash
cd backend
npm run dev
```

**Frontend (puerto 3000):**

```bash
cd client
npm start
```

La aplicación React se abrirá automáticamente en `http://localhost:3000` y se comunicará con el backend en `http://localhost:3001` mediante el proxy configurado.

---

## Arquitectura y decisiones técnicas

### Frontend (client/)

**Patrón arquitectónico:** Layered Architecture con separación de responsabilidades.

**Capas principales:**

1. **Service Layer** (`service/products.js`):

   - Centraliza toda la comunicación HTTP con la API
   - Normalización de URLs de API (soporte para rutas con/sin `/api/productos`)
   - Manejo de errores HTTP con función helper `handleResponse`
   - Gestión de imágenes locales y remotas con `getImageUrl`

2. **Custom Hooks** (`hooks/`):

   - `useProducts`: Fetching de lista de productos con estados de loading/error
   - `useProductDetail`: Fetching de producto individual y lógica de eliminación
   - `useCart`: Gestión del carrito (add, remove, delete, count, total)
   - `useNotification`: Estado compartido para notificaciones toast

3. **Components** (`components/`):

   - Componentes presentacionales reutilizables
   - Sin lógica de negocio; reciben datos via props
   - Ejemplos: ProductCard, ProductDetail, Notification, NavBar

4. **Pages** (`pages/`):
   - Componentes contenedores que orquestan hooks y servicios
   - Manejan el estado global de cada vista
   - Ejemplos: ProductosPage, ProductDetailPage, CartPage

**Decisiones clave:**

- **React Router v7** con hooks modernos (`useNavigate`, `useParams`, `useLocation`, `Link`)
- **Sistema de notificaciones** persistentes mediante `navigation state` para mantener mensajes tras redirecciones
- **Prevención de loops** de notificación con `useRef` y `history.replaceState`
- **CSS vanilla** con variables personalizadas para control granular del diseño
- **Responsive design** con CSS Grid, Flexbox y media queries
- **Carrito en memoria** (sin persistencia en localStorage por decisión de simplicidad)

**Normalización de API URL:**

El servicio de productos implementa lógica para manejar diferentes formatos de `REACT_APP_API_URL`:

- Si incluye `/api/productos`, usa tal cual
- Si no lo incluye, lo agrega automáticamente
- Fallback a `/api/productos` (proxy) si la variable no está definida

### Backend (backend/)

**Patrón arquitectónico:** MVC simplificado con Express Router.

**Estructura por capas:**

1. **Routes** (`routes/`):

   - Definición de endpoints RESTful
   - Asociación de rutas con controladores

2. **Controllers** (`controllers/`):

   - Lógica de negocio
   - Orquestación de modelos
   - Construcción de respuestas HTTP

3. **Models** (`models/`):

   - Esquemas Mongoose
   - Validación de datos a nivel de base de datos

4. **Middlewares** (`middlewares/`):
   - Logger de requests
   - Manejo centralizado de errores
   - Handler de rutas 404

**Decisiones clave:**

- **Conexión a DB aislada** en `db.js` para desacoplar el arranque del servidor
- **Manejo centralizado de errores** mediante middleware dedicado
- **Variables de entorno** gestionadas con dotenv (`utils/config.js`)
- **Mongoose ODM** para abstracción de MongoDB y validación de esquemas
- **Separación de concerns** para facilitar testing y escalabilidad

### Endpoints principales

**Productos:**

- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

---

## Despliegue

### Frontend (Vercel)

1. Conectar repositorio en Vercel
2. Configurar variables de entorno:
   - `REACT_APP_API_URL`: URL del backend en Render
3. Build command: `npm run build` (automático)
4. Output directory: `build` (automático)

### Backend (Render)

1. Crear servicio Web en Render
2. Configurar directorio: `backend`
3. Variables de entorno:
   - `DB_CONNECTION_STRING`: String de conexión de MongoDB Atlas
   - `PORT`: Puerto del servidor (Render lo proporciona automáticamente)
4. Comando de arranque: `npm start`

---

## Testing

**Frontend:**

```bash
cd client
npm test
```

- Jest + React Testing Library
- Tests unitarios de componentes y hooks

**Backend:**

```bash
cd backend
npm test
```

- Framework de testing configurado para endpoints y controladores

---

## Documentación adicional

Para información detallada sobre cada subsistema:

- **Frontend**: Ver `client/README.md` (arquitectura, hooks, componentes, estilos)
- **Backend**: Ver `backend/README.md` (endpoints, modelos, middlewares, despliegue)

---

## Colaboradores

- [Elliot Alejandro Contreras](https://github.com/ElliotLSI)
- [Nahuel Cordero](https://github.com/nahhhu)
- [Gael Ferrari](https://github.com/gaelferrari)
- [Alvaro Ibarra](https://github.com/Ibarra1812)
- [Nicolás Gonzalez](https://github.com/00nic)
