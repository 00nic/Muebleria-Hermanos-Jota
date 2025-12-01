# E-commerce Mueblería Hermanos Jota — Backend

Este repositorio contiene el backend de la aplicación (API REST con Node.js, Express y MongoDB/Mongoose).

## Sitios desplegados

-   **Frontend (Vercel)**: https://muebleria-hermanos-jota-omega.vercel.app
-   **API Backend (Render)**: https://muebleria-hermanos-jota-0o5z.onrender.com

---

## Requisitos previos

-   Node.js LTS 18+ (o superior)
-   Una base de datos MongoDB accesible (Atlas o local)

---

## Variables de entorno

El backend utiliza dotenv. Crea un archivo `.env` en la carpeta `backend` a partir del ejemplo `.env.example`:

```properties
DB_CONNECTION_STRING=mongodb+srv://usuario:password@cluster/dbname?retryWrites=true&w=majority
PORT=3001
JWT_SECRET=ItbaGrupo1 (Esto es ultra inseguro, pero como es un proyecto universidad curso lo dejamos así, pero queremos dejar en claro eso, que somos consientes de la inseguridad de esto)
```

**Descripción:**

-   `DB_CONNECTION_STRING`: cadena de conexión de MongoDB
-   `PORT`: puerto donde se levantará el servidor local (por defecto 3001)
-   `JWT_SECRET`: clave secreta para firmar tokens JWT (¡CAMBIAR en producción!)
-   `FRONTEND_URL`: URL del frontend para configuración de CORS

---

## Instalación y ejecución local

1. **Instalar dependencias**

    ```bash
    cd backend
    npm install
    ```

2. **Ejecutar en modo desarrollo** (con nodemon)

    ```bash
    npm run dev
    ```

3. **Ó ejecutar en modo producción local**

    ```bash
    npm start
    ```

4. **Servidor en ejecución**
    - URL local por defecto: `http://localhost:3001`
    - Endpoint raíz: `GET /`
    - Respuesta: `"¡Bienvenido al servidor de Mueblería Jota!"`

---

## Estructura del proyecto

```
backend/
├── src/
│   ├── server.js                    # Configuración de Express y arranque
│   ├── db.js                        # Conexión a MongoDB
│   ├── controllers/                 # Lógica de negocio
│   │   ├── authController.js        # Login y registro
│   │   ├── orderController.js       # Gestión de pedidos
│   │   ├── productController.js     # CRUD de productos
│   │   └── userController.js        # Gestión de usuarios
│   ├── models/                      # Modelos Mongoose
│   │   ├── User.js                  # Esquema de usuario
│   │   ├── Product.js               # Esquema de producto
│   │   └── Order.js                 # Esquema de orden/pedido
│   ├── routes/                      # Definición de endpoints
│   │   ├── authRoutes.js            # Rutas de autenticación
│   │   ├── orderRoutes.js           # Rutas de órdenes
│   │   ├── productosRoutes.js       # Rutas de productos
│   │   ├── userRoutes.js            # Rutas de usuario
│   │   └── usuariosRoutes.js        # Rutas alternativas de usuarios
│   ├── middlewares/                 # Middlewares personalizados
│   │   ├── authMiddleware.js        # Verificación de JWT
│   │   ├── adminGuard.js            # Verificación de rol admin
│   │   ├── logger.js                # Logger de requests
│   │   ├── manejadorCentralizado.js # Manejo de errores
│   │   └── rutaInexistente.js       # Handler 404
│   └── utils/
│       └── config.js                # Variables de entorno
├── .env.example                     # Plantilla de variables
├── package.json
└── README.md
```

---

## Modelos de datos

### User (Usuario)

```javascript
{
  username: String (requerido, único),
  email: String (requerido, único),
  password: String (requerido, hasheado con bcrypt),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product (Producto)

```javascript
{
  nombre: String (requerido),
  descripcion: String,
  precio: Number (requerido),
  imagen: String,
  categoria: String,
  stock: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order (Pedido)

```javascript
{
  userId: ObjectId (ref: 'User', requerido),
  items: [
    {
      productId: ObjectId (ref: 'Product', requerido),
      nombre: String (requerido),
      precio: Number (requerido),
      quantity: Number (requerido, min: 1)
    }
  ],
  total: Number (requerido),
  status: String (enum: ['pending', 'completed', 'cancelled'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Middlewares

### authMiddleware.js

Verifica el token JWT en el header `Authorization: Bearer <token>`.

-   Decodifica el token y agrega `req.user` con la información del usuario
-   Retorna `401` si el token es inválido o está ausente

### adminGuard.js

Verifica que el usuario autenticado tenga rol de administrador.

-   Requiere que `authMiddleware` se haya ejecutado primero
-   Retorna `403` si el usuario no es admin

### logger.js

Registra en consola todas las peticiones HTTP (método, ruta, timestamp).

### manejadorCentralizado.js

Maneja errores de forma centralizada:

-   **ValidationError** (Mongoose): `400` con mensajes de validación
-   **CastError** (ID inválido): `400` con mensaje "ID inválido o formato incorrecto"
-   **Duplicate Key** (E11000): `409` con mensaje de campo duplicado
-   **Errores personalizados**: Usa `err.status` y `err.message`
-   **Stack trace**: Solo en desarrollo

### rutaInexistente.js

Handler para rutas no definidas (404).

---

## Decisiones técnicas

### Autenticación

-   **JWT sin expiración**: Los tokens no expiran automáticamente (decisión de simplicidad)
-   **Bcrypt**: Hash de contraseñas con 10 rounds de salt
-   **No hay refresh tokens**: Sistema simplificado de autenticación
-   **Tokens en JSON**: Los tokens se devuelven en la respuesta JSON para que el frontend los guarde en localStorage

### Seguridad

-   **CORS configurado**: Permite peticiones desde el frontend en `FRONTEND_URL`
-   **Validación de datos**: Mongoose valida los esquemas
-   **Sanitización de errores**: En producción no se envía el stack trace

### Arquitectura

-   **Separación por capas**: Rutas → Controladores → Modelos
-   **Conexión a DB aislada**: `db.js` desacoplado del arranque del servidor
-   **Manejo centralizado de errores**: Middleware dedicado
-   **Variables de entorno**: Gestionadas con dotenv (`utils/config.js`)

### Órdenes/Pedidos

-   Los usuarios solo pueden acceder a sus propias órdenes
-   Las órdenes se crean en estado `pending` por defecto
-   No hay endpoints para modificar órdenes (solo lectura y creación)

---

{
"email": "usuario@example.com",
"password": "password123"
}

````

**Respuestas:**
- `200`: Login exitoso (devuelve token JWT)
- `400`: Email y password requeridos
- `401`: Credenciales inválidas

---

### Productos (`/api/productos`)

#### Listar todos los productos
```http
GET /api/productos
````

**Respuestas:**

-   `200`: Array de productos

#### Obtener producto por ID

```http
GET /api/productos/:id
```

**Respuestas:**

-   `200`: Producto encontrado
-   `404`: Producto no encontrado
-   `400`: ID inválido o formato incorrecto

#### Crear producto

```http
POST /api/productos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Silla de madera",
  "descripcion": "Silla artesanal de roble",
  "precio": 15000,
  "imagen": "silla.jpg",
  "categoria": "sillas",
  "stock": 10
}
```

**Respuestas:**

-   `201`: Producto creado
-   `400`: Error de validación
-   `401`: No autenticado

#### Actualizar producto

```http
PUT /api/productos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "precio": 16000,
  "stock": 8
}
```

**Respuestas:**

-   `200`: Producto actualizado
-   `404`: Producto no encontrado
-   `401`: No autenticado

## Despliegue (Render)

1. Crear servicio Web en Render apuntando a este proyecto (directorio `backend`)
2. **Comando de arranque**: `npm start` (Render ejecuta `npm install` automáticamente)
3. **Variables de entorno en Render**:
    - `DB_CONNECTION_STRING`: String de conexión de MongoDB Atlas
    - `JWT_SECRET`: Clave secreta para JWT (generar una segura)
    - `PORT`: Render lo proporciona automáticamente
    - `FRONTEND_URL`: URL del frontend desplegado en Vercel
4. Tras el despliegue, actualiza la URL pública de Render en el `.env` del frontend (`REACT_APP_API_BASE_URL`)

---

## Testing

Ejecutar tests (cuando estén implementados):

```bash
npm test
```

---

## Colaboradores

-   [Nahuel Cordero](https://github.com/nahhhu)
-   [Gael Ferrari](https://github.com/gaelferrari)
-   [Alvaro Ibarra](https://github.com/Ibarra1812)
-   [Nicolás Gonzalez](https://github.com/00nic)
    **Nota:** Todos los endpoints de órdenes requieren autenticación.

#### Crear una orden

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "64abc123...",
      "nombre": "Silla de madera",
      "precio": 15000,
      "quantity": 2
    }
  ],
  "total": 30000
}
```

**Respuestas:**

-   `201`: Pedido creado exitosamente
-   `400`: Validación fallida (items vacíos o total <= 0)
-   `401`: No autenticado

#### Obtener todas las órdenes del usuario

```http
GET /api/orders
Authorization: Bearer <token>
```

**Respuestas:**

-   `200`: Array de órdenes del usuario (ordenadas por fecha descendente)
-   `401`: No autenticado

#### Obtener una orden específica

```http
GET /api/orders/:id
Authorization: Bearer <token>
```

**Respuestas:**

-   `200`: Orden encontrada
-   `404`: Orden no encontrada
-   `401`: No autenticado

---

### Usuarios (`/api/user`)

#### Registro de usuario (duplicado en /api/user)

```http
POST /api/user/register
```

#### Login de usuario (duplicado en /api/user)

```http
POST /api/user/login
```

#### Logout de usuario

```http
POST /api/user/logout
Authorization: Bearer <token>
```

---

Estructura del proyecto (carpetas clave)
├── backend/ # API REST (Node.js/Express)
│ ├── src/
│ │ ├── controllers/ # Lógica de negocio
│ │ ├── models/ # Modelos Mongoose
│ │ ├── routes/ # Definición de endpoints
│ │ ├── middlewares/ # Middlewares personalizados
│ │ ├── Requests/ # requests personalizados
│ │ └── utils/ # Config y utilidades
│ ├── .env.example
│ └── package.json

-   src/
    -   server.js → configuración de Express, middlewares, rutas y arranque
    -   db.js → conexión a MongoDB (Mongoose)
    -   utils/config.js → lectura de variables de entorno (dotenv)
    -   routes/ → definición de rutas Express (productos, usuarios)
    -   controllers/ → controladores (lógica de negocio por recurso)
    -   models/ → modelos Mongoose (Product)
    -   middlewares/ → logger, manejo de 404 y manejador centralizado de errores

Decisiones/arquitectura

-   Separación por capas: rutas → controladores → modelo. Esto permite escalar y testear más fácilmente.
-   Conexión a DB aislada en `db.js` para desacoplar el arranque del servidor.
-   Manejo centralizado de errores y 404 mediante middlewares dedicados.
-   Variables de entorno gestionadas con dotenv (`utils/config.js`).

Despliegue (Render)

1. Crear servicio Web en Render apuntando a este proyecto (directorio `backend`).
2. Comando de arranque: `npm start` (Render ejecuta `npm install` automáticamente).
3. Variables de entorno en Render:
    - DB_CONNECTION_STRING: cadena MongoDB
    - PORT: Render suele proporcionarlo, pero mantener fallback en `config.port` no rompe nada.
4. Tras el despliegue, toma la URL pública de Render y actualiza este README y/o el frontend con la `API_BASE_URL` si fuese necesario.

Colaboradores

-   Nahuel Cordero (https://github.com/nahhhu)
-   Gael Ferrari (https://github.com/gaelferrari)
-   Alvaro Ibarra (https://github.com/Ibarra1812)
-   Nicolás Gonzalez (https://github.com/00nic)
