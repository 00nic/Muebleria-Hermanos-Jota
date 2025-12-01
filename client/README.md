# E-commerce Mueblería Hermanos Jota — Frontend

Este repositorio contiene el frontend de la aplicación (React SPA con Create React App).

## Sitios desplegados

-   **Frontend (Vercel)**: https://muebleria-hermanos-jota-omega.vercel.app
-   **API Backend (Render)**: https://muebleria-hermanos-jota-0o5z.onrender.com

---

## Requisitos previos

-   **Node.js LTS 18+** (o superior)
-   **npm** o **yarn**

---

## Variables de entorno

El frontend utiliza variables de entorno de **Create React App**. Crea un archivo `.env` en la carpeta `client` a partir del ejemplo `.env.example`:

```bash
cp .env.example .env
```

### Contenido del `.env`:

```properties
# URL base de la API del backend
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

### Descripción de variables:

-   **`REACT_APP_API_BASE_URL`**: URL base de la API del backend (sin incluir el endpoint específico).
    -   **Importante**: Las variables en CRA **deben** empezar con `REACT_APP_`.
    -   Ejemplos:
        -   Local: `http://localhost:3001/api`
        -   Producción: `https://muebleria-hermanos-jota-0o5z.onrender.com/api`
    -   Si se modifica el `.env`, **reinicia el servidor** (`npm start`) para que los cambios surtan efecto.

### Proxy para desarrollo local:

Si el backend corre en `http://localhost:3001`, el `package.json` incluye un proxy:

```json
"proxy": "http://localhost:3001"
```

Esto permite usar rutas relativas en desarrollo sin configurar CORS.

---

## Instalación y ejecución local

### 1. Instalar dependencias

```bash
cd client
npm install
```

### 2. Ejecutar en modo desarrollo

```bash
npm start
```

-   Abre automáticamente el navegador en `http://localhost:3000`.
-   Hot reload habilitado: los cambios se reflejan automáticamente.

### 3. Compilar para producción

```bash
npm run build
```

-   Genera la carpeta `build/` con los archivos estáticos optimizados.
-   Lista para desplegar en Vercel, Netlify, GitHub Pages, etc.

### 4. Ejecutar tests

```bash
npm test
```

-   Ejecuta tests con Jest y React Testing Library.

---

## Estructura del proyecto

```
client/
├── public/              # Archivos estáticos (HTML, manifest, robots.txt)
├── src/
│   ├── App.js           # Componente raíz con React Router
│   ├── index.js         # Punto de entrada de React
│   ├── auth/            # Sistema de autenticación
│   │   ├── AuthContext.js       # Context de autenticación
│   │   └── AuthProvider.jsx     # Provider con login/logout/getAuthHeaders
│   ├── components/      # Componentes reutilizables
│   │   ├── NavBar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── ProductDetail.js
│   │   ├── ProductList.js
│   │   ├── ProductForm.js
│   │   ├── Cart.js
│   │   ├── auth/
│   │   │   └── LoginForm.js     # Formulario de login
│   │   ├── home/
│   │   │   ├── HeroBanner.js
│   │   │   └── HeroBanner.css
│   │   └── utils/
│   │       ├── Button.js
│   │       └── Notification.js  # Sistema de notificaciones toast
│   ├── pages/           # Páginas de la aplicación
│   │   ├── HomePage.js
│   │   ├── ProductosPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── AddProductPage.js
│   │   ├── CartPage.js
│   │   ├── ContactForm.js
│   │   ├── RegisterPage.js      # Registro de usuarios
│   │   ├── ProfilePage.js       # Perfil de usuario
│   │   ├── MisPedidosPage.js    # Historial de pedidos
│   │   └── NotFoundPage.js      # Página 404
│   ├── routes/          # Configuración de rutas
│   │   ├── AppRoutes.js         # Definición de todas las rutas
│   │   ├── ProtectedRoute.js    # HOC para rutas autenticadas
│   │   └── AdminRoute.js        # HOC para rutas de admin
│   ├── hooks/           # Custom Hooks
│   │   ├── useProducts.js       # Listado de productos
│   │   ├── useProductDetail.js  # Detalle y eliminación de producto
│   │   └── useNotifications.js  # Hooks de notificaciones reutilizables
│   ├── context/         # Contexts de React
│   │   ├── CartContext.js       # Context del carrito
│   │   ├── CartProvider.js      # Provider con add/remove/delete
│   │   ├── NotificationContext.js
│   │   └── NotificationProvider.js
│   ├── service/         # Capa de servicio (API calls)
│   │   ├── api.js               # Configuración centralizada (headers, endpoints)
│   │   ├── products.js          # CRUD de productos
│   │   ├── pedidos.js           # API de pedidos/órdenes
│   │   ├── login.js             # Login de usuario
│   │   ├── register.js          # Registro de usuario
│   │   └── user.js              # Información del usuario
│   ├── utils/           # Utilidades
│   │   ├── formatearPrecio.js   # Formateador de precios (ARS)
│   │   └── orderUtils.js        # Utilidades de órdenes (formatDate, getStatus)
│   ├── assets/          # Imágenes locales de productos
│   │   └── productos/
│   └── styles/          # Estilos CSS (algunos componentes usan CSS modules)
├── .env.example         # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Tecnologías y dependencias principales

### Core:

-   **React 19.1.1**: Biblioteca principal de UI.
-   **React DOM 19.1.1**: Renderizado en el navegador.
-   **React Router DOM 7.9.5**: Enrutamiento SPA (BrowserRouter, Routes, Route, useNavigate, useParams).

### Build tools:

-   **Create React App (react-scripts 5.0.1)**: Configuración y build sin configuración manual de Webpack.

## Arquitectura y decisiones técnicas

### 1. **Separación de responsabilidades (Layered Architecture)**

El proyecto sigue una arquitectura en capas para mantener el código escalable y testeable:

-   **Service Layer** (`service/`):

    -   **`api.js`**: Configuración centralizada de la API
        -   `API_BASE_URL`: URL base del backend
        -   `getAuthHeaders()`: Genera headers con token JWT
        -   `handleResponse()`: Manejo unificado de respuestas HTTP
        -   `API_ENDPOINTS`: Objeto con todos los endpoints (`products`, `auth`, `orders`, `user`)
    -   **`products.js`**: CRUD de productos (getAllProducts, getProductById, createProduct, deleteProduct)
    -   **`pedidos.js`**: API de órdenes (getUserOrders, getOrderById, createOrder)
    -   **`login.js`**: Login de usuario
    -   **`register.js`**: Registro de usuario
    -   **`user.js`**: Información del usuario
    -   Todos los servicios usan la configuración centralizada de `api.js`

-   **Custom Hooks** (`hooks/`):

    -   `useProducts`: Fetching de lista de productos con estados de loading/error
    -   `useProductDetail`: Fetching de producto individual + lógica de eliminación
    -   `useNotifications`: Hooks reutilizables para loading y error notifications
        -   `useLoadingNotification`: Maneja estados de carga
        -   `useErrorNotification`: Maneja errores con prioridad a mensajes del servidor

-   **Context API** (`context/` y `auth/`):

    -   `AuthProvider`: Gestión de autenticación (login, logout, token en localStorage)
    -   `CartProvider`: Gestión del carrito de compras
    -   `NotificationProvider`: Sistema de notificaciones toast

-   **Components** (`components/`):

    -   Componentes presentacionales reutilizables
    -   Sin lógica de negocio pesada; reciben props

-   **Pages** (`pages/`):

    -   Componentes de nivel superior que orquestan hooks, servicios y componentes
    -   Manejan el estado global de cada página

-   **Routes** (`routes/`):
    -   `AppRoutes`: Definición de todas las rutas de la aplicación
    -   `ProtectedRoute`: HOC que requiere autenticación
    -   `AdminRoute`: HOC que requiere autenticación y rol de admin

### 2. **Sistema de autenticación con JWT**

-   **Token sin expiración**: Los tokens JWT no tienen tiempo de expiración (decisión de simplicidad)
-   **Almacenamiento**: Token guardado en `localStorage`
-   **AuthProvider**:
    -   `login(token, user)`: Guarda token y usuario en localStorage
    -   `logout()`: Limpia localStorage y estado
    -   `getAuthHeaders()`: Retorna headers con Authorization Bearer
-   **Rutas protegidas**:
    -   `ProtectedRoute`: Verifica autenticación antes de renderizar
    -   `AdminRoute`: Verifica autenticación + rol de admin
-   **Navegación post-autenticación**:
    -   Registro → redirige a `/login`
    -   Login → redirige a `/` (home)

### 3. **Sistema de pedidos/órdenes**

-   **Página `/mis-pedidos`**: Historial de pedidos del usuario autenticado
-   **Service `pedidos.js`**: Comunicación con API de órdenes
-   **Utilities `orderUtils.js`**:
    -   `formatDate`: Formato de fecha en español (dd/mm/yyyy)
    -   `getOrderStatusText`: Mapeo de estados (pending → "Pendiente", etc.)
    -   `getOrderStatusClass`: Clases CSS según estado
-   **Diseño**: Cards estilizadas con paleta de colores consistente

### 4. **Sistema de notificaciones persistentes**

-   **Problema**: Las notificaciones desaparecían tras redirecciones
-   **Solución**:
    -   Uso de `useNavigate` con `state` para pasar mensajes entre páginas
    -   Componente `Notification` reutilizable con estilos toast
    -   Hook `useNotifications` para encapsular lógica
    -   Prevención de loops con `useRef` y `history.replaceState`

### 5. **Manejo centralizado de errores**

-   **Prioridad a mensajes del servidor**: Los servicios usan `errorData.message` del backend
-   **Fallbacks específicos**: Mensajes por defecto según código HTTP (404, 400, 500)
-   **Hook `useErrorNotification`**: Lógica reutilizable para mostrar errores sin sobrescribir notificaciones

### 6. **Manejo de imágenes (local + remoto)**

-   **Función `getImageUrl` en `service/products.js`**:
    -   Detecta si la imagen es una URL externa (`http://` o `https://`)
    -   Si es local, usa `require()` para cargarla desde `assets/productos/`
    -   Fallback robusto con `try/catch` y warnings en consola

### 7. **Routing con React Router**

-   **BrowserRouter** como wrapper principal en `index.js`
-   **Routes** y **Route** en `AppRoutes.js`
-   **Hooks utilizados**:
    -   `useNavigate`: Redirecciones programáticas
    -   `useParams`: Obtener parámetros de URL (`:id`)
    -   `useLocation`: Leer estado de navegación (`state`)
    -   `Link`: Navegación declarativa en Navbar
-   **Página 404**: NotFoundPage con estilos personalizados

### 8. **Carrito de compras con Context API**

-   **CartProvider**: Estado global del carrito
-   **Funciones**:
    -   `addItem`: Agrega un producto al array
    -   `removeItem`: Elimina una instancia específica
    -   `deleteItem`: Elimina todas las instancias de un producto
    -   `getCartCount`: Total de productos
    -   `getCartTotal`: Suma total de precios
-   **Nota**: No persiste en localStorage (se pierde al refrescar)

### 9. **Estilos y UI/UX**

-   **Paleta de colores consistente**:
    -   `--color-principal`: #f5e6d3 (beige)
    -   `--color-secundario`: #8b4513 (marrón)
    -   `--color-acento`: #d4a437 (dorado)
    -   `--color-terciario`: #87a96b (verde)
-   **CSS global** en `App.css` con variables CSS
-   **Responsive design**:
    -   Grid layout para ProductList
    -   Sticky navbar
    -   Toast notifications con posicionamiento absoluto
-   **Consistencia visual**:
    -   Cards con alturas uniformes
    -   Espaciado estandarizado
    -   Feedback visual inmediato

### 10. **Gestión de estados de carga y error**

-   **Loading states**: Hook `useLoadingNotification` maneja estados de carga
-   **Error handling**:
    -   Mensajes claros según tipo de error
    -   Propagación de errores desde el service
    -   Display con estilos diferenciados (rojo/verde/azul)
-   **Prevención de duplicados**: No sobrescribir notificaciones de éxito/error

---

## Despliegue (Vercel/Netlify)

### Vercel (recomendado para Create React App):

1. **Conecta el repositorio** en Vercel
2. **Configura las variables de entorno**:
    - `REACT_APP_API_BASE_URL`: `https://muebleria-hermanos-jota-0o5z.onrender.com/api`
3. **Build command**: `npm run build` (automático)
4. **Output directory**: `build` (automático)
5. **Deploy**: Vercel construye y despliega automáticamente en cada push a `main`

---

## Scripts disponibles

```bash
npm start       # Inicia el servidor de desarrollo (puerto 3000)
npm run build   # Compila para producción (carpeta build/)
npm test        # Ejecuta tests con Jest
npm run eject   # Expone configuración de CRA (irreversible, no recomendado)
```

---

## Características implementadas

### Autenticación y seguridad

✅ **Sistema de autenticación JWT** sin expiración  
✅ **Registro de usuarios** con validación  
✅ **Login de usuarios** con redirección automática  
✅ **Rutas protegidas** (ProtectedRoute y AdminRoute)  
✅ **Headers de autenticación centralizados** en todos los servicios

### Gestión de productos

✅ **Listado de productos** con grid responsive  
✅ **Detalle de producto** con opción de agregar al carrito  
✅ **Creación de productos** (admin) con formulario  
✅ **Eliminación de productos** con confirmación  
✅ **Manejo de imágenes locales y remotas**

### Carrito y pedidos

✅ **Carrito de compras** con incremento/decremento de cantidades  
✅ **Historial de pedidos** (`/mis-pedidos`) con estados visuales  
✅ **Creación de órdenes** desde el carrito  
✅ **Formateador de fechas** en español  
✅ **Estados de pedidos** (pendiente, completado, cancelado)

### UI/UX

✅ **Sistema de notificaciones toast** persistente entre páginas  
✅ **Hero banner** en home con CTA  
✅ **Navegación con navbar sticky**  
✅ **Página 404** estilizada para rutas no existentes  
✅ **Formateador de precios** (ARS con separador de miles)  
✅ **Paleta de colores consistente** en toda la aplicación  
✅ **Formulario de contacto**

### Arquitectura

✅ **Configuración centralizada de API** (`api.js`)  
✅ **Manejo de errores priorizado** (mensajes del servidor)  
✅ **Custom hooks reutilizables** (useNotifications, useProducts, useProductDetail)  
✅ **Context API** para estado global (Auth, Cart, Notifications)  
✅ **Utilidades reutilizables** (orderUtils, formatearPrecio)

---

## Colaboradores

-   [Nahuel Cordero](https://github.com/nahhhu)
-   [Gael Ferrari](https://github.com/gaelferrari)
-   [Alvaro Ibarra](https://github.com/Ibarra1812)
-   [Nicolás Gonzalez](https://github.com/00nic)
