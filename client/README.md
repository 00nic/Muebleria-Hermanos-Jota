# E-commerce Mueblería Hermanos Jota — Frontend

Este repositorio contiene el frontend de la aplicación (React SPA con Create React App).

## Sitios desplegados

- **Frontend (Vercel)**: https://muebleria-hermanos-jota-omega.vercel.app
- **API Backend (Render)**: https://muebleria-hermanos-jota-0o5z.onrender.com

---

## Requisitos previos

- **Node.js LTS 18+** (o superior)
- **npm** o **yarn**

---

## Variables de entorno

El frontend utiliza variables de entorno de **Create React App**. Crea un archivo `.env` en la carpeta `client` a partir del ejemplo `.env.example`:

```bash
cp .env.example .env
```

### Contenido del `.env`:

```properties
# Desactiva la verificación de host (útil para desarrollo con Webpack Dev Server)
DANGEROUSLY_DISABLE_HOST_CHECK=true

# URL base de la API del backend
# Formato: https://tu-dominio.com/api/productos
REACT_APP_API_URL=https://muebleria-hermanos-jota-0o5z.onrender.com/api/productos
```

### Descripción de variables:

- **`DANGEROUSLY_DISABLE_HOST_CHECK`**: Desactiva la verificación de host en desarrollo (solo usar en dev, no en producción).
- **`REACT_APP_API_URL`**: URL completa del backend (incluye `/api/productos`).
  - **Importante**: Las variables en CRA **deben** empezar con `REACT_APP_`.
  - Si se modifica el `.env`, **reinicia el servidor** (`npm start`) para que los cambios surtan efecto.

### Proxy para desarrollo local:

Si el backend corre en `http://localhost:3001`, el `package.json` incluye un proxy:

```json
"proxy": "http://localhost:3001"
```

Esto permite usar rutas relativas (`/api/productos`) en desarrollo sin configurar CORS.

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

- Abre automáticamente el navegador en `http://localhost:3000`.
- Hot reload habilitado: los cambios se reflejan automáticamente.

### 3. Compilar para producción

```bash
npm run build
```

- Genera la carpeta `build/` con los archivos estáticos optimizados.
- Lista para desplegar en Vercel, Netlify, GitHub Pages, etc.

### 4. Ejecutar tests

```bash
npm test
```

- Ejecuta tests con Jest y React Testing Library.

---

## Estructura del proyecto

```
client/
├── public/              # Archivos estáticos (HTML, manifest, robots.txt)
├── src/
│   ├── App.js           # Componente raíz con React Router
│   ├── index.js         # Punto de entrada de React
│   ├── components/      # Componentes reutilizables
│   │   ├── NavBar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── ProductDetail.js
│   │   ├── ProductList.js
│   │   ├── ProductForm.js
│   │   ├── Cart.js
│   │   ├── ContactForm.js
│   │   ├── home/
│   │   │   └── HeroBanner.js
│   │   └── utils/
│   │       ├── Button.js
│   │       └── Notification.js    # Sistema de notificaciones toast
│   ├── pages/           # Páginas de la aplicación
│   │   ├── HomePage.js
│   │   ├── ProductosPage.js
│   │   ├── ProductDetailPage.js
│   │   ├── AddProductPage.js
│   │   └── CartPage.js
│   ├── hooks/           # Custom Hooks
│   │   ├── useCart.js             # Manejo del carrito (add, remove, delete)
│   │   ├── useProducts.js         # Listado de productos
│   │   ├── useProductDetail.js    # Detalle y eliminación de producto
│   │   └── useNotification.js     # Sistema de notificaciones
│   ├── service/         # Capa de servicio (API calls)
│   │   └── products.js            # CRUD de productos + helper de imágenes
│   ├── utils/
│   │   └── formatearPrecio.js     # Formateador de precios (ARS)
│   ├── assets/          # Imágenes locales de productos
│   └── styles/          # Estilos CSS
├── .env.example         # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Tecnologías y dependencias principales

### Core:

- **React 19.1.1**: Biblioteca principal de UI.
- **React DOM 19.1.1**: Renderizado en el navegador.
- **React Router DOM 7.9.5**: Enrutamiento SPA (BrowserRouter, Routes, Route, useNavigate, useParams).

### Build tools:

- **Create React App (react-scripts 5.0.1)**: Configuración y build sin configuración manual de Webpack.

## Arquitectura y decisiones técnicas

### 1. **Separación de responsabilidades (Layered Architecture)**

El proyecto sigue una arquitectura en capas para mantener el código escalable y testeable:

- **Service Layer** (`service/products.js`):

  - Toda la lógica de comunicación con la API está centralizada aquí.
  - Funciones: `getAllProducts`, `getProductById`, `createProduct`, `deleteProduct`, `getImageUrl`.
  - Manejo de errores HTTP con función helper `handleResponse`.
  - Normalización de rutas (`REACT_APP_API_URL` con o sin `/api/productos`).

- **Custom Hooks** (`hooks/`):

  - `useProducts`: Fetching de lista de productos con estados de loading/error.
  - `useProductDetail`: Fetching de producto individual + lógica de eliminación.
  - `useCart`: Gestión del carrito (agregar, eliminar uno, eliminar todos).
  - `useNotification`: Estado compartido para notificaciones toast.

- **Components** (`components/`):

  - Componentes presentacionales reutilizables (ProductCard, ProductDetail, Notification).
  - Sin lógica de negocio pesada; reciben props.

- **Pages** (`pages/`):
  - Componentes de nivel superior que orquestan hooks, servicios y componentes.
  - Manejan el estado global de cada página (ProductosPage, ProductDetailPage, etc.).

### 2. **Sistema de notificaciones persistentes**

- **Problema**: Las notificaciones de éxito/error desaparecían tras redirecciones.
- **Solución**:
  - Uso de `useNavigate` con `state` para pasar mensajes entre páginas.
  - Componente `Notification` reutilizable con estilos toast.
  - Hook `useNotification` para encapsular lógica de mostrar/ocultar.
  - Prevención de loops con `useRef` y `history.replaceState`.

### 3. **Manejo de imágenes (local + remoto)**

- **Función `getImageUrl` en `service/products.js`**:
  - Detecta si la imagen es una URL externa (`http://` o `https://`).
  - Si es local, usa `require()` para cargarla desde `assets/productos/`.
  - Fallback robusto con `try/catch` y warnings en consola.

### 4. **Normalización de rutas de API**

- **Problema**: La variable `REACT_APP_API_URL` podía venir con o sin `/api/productos`.
- **Solución**:
  - Lógica de normalización en `products.js`:
    - Si termina en `/api/productos`, usa tal cual.
    - Si no, agrega `/api/productos`.
    - Fallback a `/api/productos` (proxy) si la variable no está definida.
  - Esto evita duplicaciones (`/api/productos/api/productos`) y permite flexibilidad en entornos.

### 5. **Routing con React Router**

- **BrowserRouter** como wrapper principal en `index.js`.
- **Routes** y **Route** en `App.js` para definir rutas.
- **Hooks utilizados**:
  - `useNavigate`: Redirecciones programáticas (ej. tras crear/eliminar producto).
  - `useParams`: Obtener parámetros de URL (`:id` en detalle de producto).
  - `useLocation`: Leer estado de navegación (`state`) para notificaciones.
  - `Link`: Navegación declarativa en Navbar.

### 6. **Carrito de compras en memoria**

- **Estado local** con `useState` en el hook `useCart`.
- **Funciones**:
  - `addItem`: Agrega un producto al array.
  - `removeItem`: Elimina una instancia específica.
  - `deleteItem`: Elimina todas las instancias de un producto.
  - `getCartCount`: Total de productos.
  - `getCartTotal`: Suma total de precios.
- **Nota**: No persiste en localStorage (se pierde al refrescar). Potencial mejora futura.

### 7. **Estilos y UI/UX**

- **CSS global** en `App.css` con variables CSS para colores y breakpoints.
- **Responsive design**:
  - Grid layout para ProductList.
  - Sticky navbar.
  - Toast notifications con posicionamiento absoluto.
- **Consistencia visual**:
  - ProductCard con alturas uniformes (imagen fija + `line-clamp` para texto).
  - Espaciado estandarizado entre botones.
  - Feedback visual inmediato con notificaciones.

### 8. **Gestión de estados de carga y error**

- **Loading states**: Componente `Notification` reutilizado para "Cargando...".
- **Error handling**:
  - Mensajes claros según tipo de error (404, 400, 500).
  - Propagación de errores desde el service hasta los hooks.
  - Display de errores con estilos diferenciados (rojo para error, verde para éxito).

### 9. **Configuración del entorno**

- **Variables de entorno** inyectadas en tiempo de build por CRA (`process.env.REACT_APP_*`).
- **Proxy en desarrollo**: Evita problemas de CORS al hacer requests al backend local.
- **Despliegue**: Variables configuradas en Vercel/Netlify (no se usa el `.env` en producción; se configuran en el panel de la plataforma).

---

## Despliegue (Vercel/Netlify)

### Vercel (recomendado para Create React App):

1. **Conecta el repositorio** en Vercel.
2. **Configura las variables de entorno**:
   - `REACT_APP_API_URL`: URL del backend en Render.
3. **Build command**: `npm run build` (automático).
4. **Output directory**: `build` (automático).
5. **Deploy**: Vercel construye y despliega automáticamente en cada push a `main`.

## Scripts disponibles

```bash
npm start       # Inicia el servidor de desarrollo (puerto 3000)
npm run build   # Compila para producción (carpeta build/)
npm test        # Ejecuta tests con Jest
npm run eject   # Expone configuración de CRA (irreversible, no recomendado)
```

---

## Características implementadas

✅ **Listado de productos** con grid responsive.  
✅ **Detalle de producto** con opción de agregar al carrito.  
✅ **Carrito de compras** con incremento/decremento de cantidades.  
✅ **Creación de productos** (admin) con formulario.  
✅ **Eliminación de productos** con confirmación.  
✅ **Sistema de notificaciones toast** persistente entre páginas.  
✅ **Manejo de imágenes locales y remotas**.  
✅ **Formulario de contacto**.  
✅ **Hero banner** en home con CTA.  
✅ **Navegación con navbar sticky**.  
✅ **Página 404** para rutas no existentes.  
✅ **Formateador de precios** (ARS con separador de miles).

---

## Colaboradores

- [Elliot Alejandro Contreras](https://github.com/ElliotLSI)
- [Nahuel Cordero](https://github.com/nahhhu)
- [Gael Ferrari](https://github.com/gaelferrari)
- [Alvaro Ibarra](https://github.com/Ibarra1812)
- [Nicolás Gonzalez](https://github.com/00nic)
