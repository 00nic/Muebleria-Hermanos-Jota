# E-commerce Mueblería Hermanos Jota

Aplicación web full-stack de e-commerce para la venta de muebles artesanales, implementada como una Single Page Application (SPA) con arquitectura cliente-servidor separada.

## Sitios desplegados

-   **Frontend (Vercel)**: https://muebleria-hermanos-jota-omega.vercel.app
-   **API Backend (Render)**: https://muebleria-hermanos-jota-0o5z.onrender.com

---

## Descripción del proyecto

Sistema de comercio electrónico completo que permite a los usuarios explorar un catálogo de productos, visualizar detalles individuales, gestionar un carrito de compras, realizar pedidos y llevar un historial de compras. El proyecto implementa autenticación JWT, operaciones CRUD completas sobre el catálogo de productos y gestión de órdenes con persistencia en MongoDB.

**Funcionalidades principales:**

### Autenticación y seguridad

-   Sistema de autenticación JWT sin expiración
-   Registro y login de usuarios con validación
-   Rutas protegidas (autenticadas y solo admin)
-   Headers de autenticación centralizados

### Gestión de productos

-   Catálogo de productos con grid responsive
-   Sistema de detalle de producto con imágenes locales y remotas
-   Panel de administración para creación y eliminación de productos (solo admin)

### Carrito y pedidos

-   Carrito de compras con gestión de cantidades (agregar, incrementar, decrementar, eliminar)
-   Creación de órdenes/pedidos desde el carrito
-   Historial de pedidos del usuario (/mis-pedidos)
-   Estados de pedidos (pendiente, completado, cancelado)

### UI/UX

-   Sistema de notificaciones toast persistentes entre navegaciones
-   Manejo de estados de carga y errores con feedback visual
-   Paleta de colores consistente en toda la aplicación
-   Página 404 estilizada
-   Formulario de contacto

---

## Arquitectura general

El proyecto sigue una arquitectura cliente-servidor desacoplada, con comunicación exclusivamente mediante API REST. Ambas aplicaciones son independientes y pueden desplegarse en infraestructuras separadas.

### Stack tecnológico

**Frontend:**

-   React 19.1.1 (Create React App)
-   React Router DOM 7.9.5
-   Context API (AuthContext, CartContext, NotificationContext)
-   CSS3 vanilla con variables personalizadas y paleta de colores
-   Fetch API para requests HTTP
-   localStorage para persistencia de tokens JWT

**Backend:**

-   Node.js con Express 5
-   MongoDB con Mongoose ODM
-   JWT (jsonwebtoken) para autenticación
-   bcrypt para hash de contraseñas
-   dotenv para configuración de entorno
-   Middlewares personalizados (authMiddleware, adminGuard, logger, error handler, 404 handler)

**DevOps:**

-   Frontend desplegado en Vercel
-   Backend desplegado en Render
-   Base de datos MongoDB Atlas

### Estructura del monorepo

```
/
├── client/              # Aplicación React (frontend)
│   ├── src/
│   │   ├── auth/        # Sistema de autenticación (AuthContext, AuthProvider)
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Componentes de página (HomePage, ProductosPage, MisPedidosPage, etc.)
│   │   ├── routes/      # Configuración de rutas (AppRoutes, ProtectedRoute, AdminRoute)
│   │   ├── hooks/       # Custom hooks (useProducts, useProductDetail, useNotifications)
│   │   ├── context/     # Context providers (CartProvider, NotificationProvider)
│   │   ├── service/     # Capa de servicio (api.js, products.js, pedidos.js, login.js, etc.)
│   │   └── utils/       # Utilidades (formatearPrecio, orderUtils)
│   ├── public/
│   ├── .env.example
│   └── package.json
│
├── backend/             # API REST (Node.js/Express)
│   ├── src/
│   │   ├── controllers/ # Lógica de negocio (authController,     orderController, productController, userController)
│   │   ├── models/      # Modelos Mongoose (User, Product, Order)
│   │   ├── routes/      # Definición de endpoints (authRoutes, orderRoutes, productosRoutes, userRoutes)
│   │   ├── middlewares/ # Middlewares (authMiddleware, adminGuard, logger, error handler, 404)
│   │   ├── Request/     # Archivos .rest para testing de API
│   │   └── utils/       # Config y utilidades
│   ├── .env.example
│   └── package.json
│
└── README.md            # Documentación general (este archivo)
```

---

## Instalación y configuración

### Requisitos previos

-   Node.js LTS 18+ (o superior)
-   npm o yarn
-   MongoDB accesible (MongoDB Atlas o instancia local)

### Configuración de variables de entorno

Ambas aplicaciones requieren configuración de entorno mediante archivos `.env`.

#### Backend (`backend/.env`):

```properties
DB_CONNECTION_STRING=mongodb+srv://usuario:password@cluster/dbname?retryWrites=true&w=majority
PORT=3001
JWT_SECRET=tu_clave_secreta_super_segura
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (`client/.env`):

```properties
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

**Nota:**

-   Para producción: `REACT_APP_API_BASE_URL=https://muebleria-hermanos-jota-0o5z.onrender.com/api`
-   El `package.json` del cliente incluye `"proxy": "http://localhost:3001"` para evitar problemas de CORS en desarrollo

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

1. **Service Layer** (`service/`):

    - **`api.js`**: Configuración centralizada de la API
        - `API_BASE_URL`: URL base del backend
        - `getAuthHeaders()`: Genera headers con token JWT
        - `handleResponse()`: Manejo unificado de respuestas HTTP
        - `API_ENDPOINTS`: Objeto con todos los endpoints
    - **`products.js`**: CRUD de productos
    - **`pedidos.js`**: API de órdenes/pedidos
    - **`login.js`**: Login de usuario
    - **`register.js`**: Registro de usuario
    - **`user.js`**: Información del usuario
    - Todos los servicios usan la configuración centralizada

2. **Custom Hooks** (`hooks/`):

    - `useProducts`: Fetching de lista de productos con estados de loading/error
    - `useProductDetail`: Fetching de producto individual y lógica de eliminación
    - `useNotifications`: Hooks reutilizables para loading y error notifications

3. **Context API** (`context/` y `auth/`):

    - `AuthProvider`: Gestión de autenticación (login, logout, token en localStorage)
    - `CartProvider`: Gestión del carrito de compras
    - `NotificationProvider`: Sistema de notificaciones toast

4. **Components** (`components/`):

    - Componentes presentacionales reutilizables
    - Sin lógica de negocio; reciben datos via props
    - Ejemplos: ProductCard, ProductDetail, Notification, NavBar, LoginForm

5. **Pages** (`pages/`):

    - Componentes contenedores que orquestan hooks y servicios
    - Manejan el estado global de cada vista
    - Ejemplos: ProductosPage, ProductDetailPage, CartPage, MisPedidosPage, RegisterPage, ProfilePage

6. **Routes** (`routes/`):
    - `AppRoutes`: Definición de todas las rutas de la aplicación
    - `ProtectedRoute`: HOC que requiere autenticación
    - `AdminRoute`: HOC que requiere autenticación y rol de admin

**Decisiones clave:**

-   **Autenticación JWT sin expiración**: Tokens almacenados en localStorage
-   **React Router v7** con hooks modernos (`useNavigate`, `useParams`, `useLocation`, `Link`)
-   **Rutas protegidas**: ProtectedRoute y AdminRoute para control de acceso
-   **Sistema de notificaciones** persistentes mediante `navigation state` para mantener mensajes tras redirecciones
-   **Prevención de loops** de notificación con `useRef` y `history.replaceState`
-   **Configuración centralizada de API** en `api.js` para evitar duplicación de código
-   **Manejo de errores priorizado**: Los mensajes del servidor tienen prioridad sobre fallbacks
-   **Paleta de colores consistente**: Variables CSS (#f5e6d3, #8b4513, #d4a437, #87a96b)
-   **CSS vanilla** con variables personalizadas para control granular del diseño
-   **Responsive design** con CSS Grid, Flexbox y media queries
-   **Carrito en memoria** (sin persistencia en localStorage por decisión de simplicidad)
-   **Custom hooks reutilizables**: useNotifications para lógica común de notificaciones
-   **Utilidades compartidas**: orderUtils para formateo de fechas y estados de pedidos
-   **Sistema de notificaciones** persistentes mediante `navigation state` para mantener mensajes tras redirecciones
-   **Prevención de loops** de notificación con `useRef` y `history.replaceState`
-   **Configuración centralizada de API** en `api.js` para evitar duplicación de código
-   **Manejo de errores priorizado**: Los mensajes del servidor tienen prioridad sobre fallbacks
-   **Paleta de colores consistente**: Variables CSS (#f5e6d3, #8b4513, #d4a437, #87a96b)
-   **CSS vanilla** con variables personalizadas para control granular del diseño
-   **Responsive design** con CSS Grid, Flexbox y media queries
-   **Carrito en memoria** (sin persistencia en localStorage por decisión de simplicidad)
-   **Custom hooks reutilizables**: useNotifications para lógica común de notificaciones
-   **Utilidades compartidas**: orderUtils para formateo de fechas y estados de pedidos

### Backend (backend/)

**Patrón arquitectónico:** MVC simplificado con Express Router.

**Estructura por capas:**

1. **Routes** (`routes/`):

    - **`authRoutes.js`**: Rutas de autenticación (login, register)
    - **`orderRoutes.js`**: Rutas de órdenes/pedidos
    - **`productosRoutes.js`**: Rutas de productos (CRUD)
    - **`userRoutes.js`**: Rutas de usuario
    - Asociación de rutas con controladores

2. **Controllers** (`controllers/`):

    - **`authController.js`**: Login y registro con JWT
    - **`orderController.js`**: Gestión de pedidos
    - **`productController.js`**: CRUD de productos
    - **`userController.js`**: Gestión de usuarios
    - Lógica de negocio y orquestación de modelos

3. **Models** (`models/`):

    - **`User.js`**: Esquema de usuario (username, email, password, role)
    - **`Product.js`**: Esquema de producto (nombre, descripción, precio, etc.)
    - **`Order.js`**: Esquema de orden/pedido (userId, items, total, status)
    - Validación de datos a nivel de base de datos

4. **Middlewares** (`middlewares/`):
    - **`authMiddleware.js`**: Verificación de JWT
    - **`adminGuard.js`**: Verificación de rol de administrador
    - **`logger.js`**: Logger de requests
    - **`manejadorCentralizado.js`**: Manejo centralizado de errores
    - **`rutaInexistente.js`**: Handler de rutas 404

**Decisiones clave:**

-   **Autenticación JWT sin expiración**: Tokens sin tiempo de expiración (decisión de simplicidad)
-   **Bcrypt**: Hash de contraseñas con 10 rounds de salt
-   **Conexión a DB aislada** en `db.js` para desacoplar el arranque del servidor
-   **Manejo centralizado de errores** mediante middleware dedicado con mensajes específicos
-   **Variables de entorno** gestionadas con dotenv (`utils/config.js`)
-   **Mongoose ODM** para abstracción de MongoDB y validación de esquemas
-   **Separación de concerns** para facilitar testing y escalabilidad
-   **CORS configurado** para permitir peticiones desde el frontend
-   **Middlewares de seguridad**: authMiddleware y adminGuard para protección de rutas
-   **Sanitización de errores**: En producción no se envía el stack trace

### Endpoints principales

**Autenticación:**

-   `POST /api/auth/register` - Registro de usuario
-   `POST /api/auth/login` - Login de usuario (devuelve token JWT)

**Productos:**

-   `GET /api/productos` - Listar todos los productos (público)
-   `GET /api/productos/:id` - Obtener producto por ID (público)
-   `POST /api/productos` - Crear nuevo producto (requiere autenticación)
-   `PUT /api/productos/:id` - Actualizar producto (requiere autenticación)
-   `DELETE /api/productos/:id` - Eliminar producto (requiere autenticación)

**Órdenes/Pedidos:**

-   `GET /api/orders` - Obtener pedidos del usuario autenticado (requiere autenticación)
-   `GET /api/orders/:id` - Obtener pedido específico (requiere autenticación)
-   `POST /api/orders` - Crear nuevo pedido (requiere autenticación)

**Usuarios:**

-   `POST /api/user/logout` - Logout de usuario (requiere autenticación)

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

-   Jest + React Testing Library
-   Tests unitarios de componentes y hooks

**Backend:**

```bash
cd backend
npm test
```

-   Framework de testing configurado para endpoints y controladores

---

## Documentación adicional

Para información detallada sobre cada subsistema:

-   **Frontend**: Ver `client/README.md` (arquitectura, hooks, componentes, estilos)
-   **Backend**: Ver `backend/README.md` (endpoints, modelos, middlewares, despliegue)

---

## Colaboradores

-   [Nahuel Cordero](https://github.com/nahhhu)
-   [Gael Ferrari](https://github.com/gaelferrari)
-   [Alvaro Ibarra](https://github.com/Ibarra1812)
-   [Nicolás Gonzalez](https://github.com/00nic)
