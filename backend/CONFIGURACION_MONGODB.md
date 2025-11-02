# Guía de Configuración de MongoDB

## 📋 Opciones de MongoDB

Tienes dos opciones para usar MongoDB:

---

## 🖥️ Opción 1: MongoDB Local (Instalado en tu computadora)

### Paso 1: Instalar MongoDB

**Windows:**
1. Descarga MongoDB desde: https://www.mongodb.com/try/download/community
2. Instala el instalador `.msi`
3. Durante la instalación, marca la opción "Install MongoDB as a Service"
4. MongoDB se iniciará automáticamente en el puerto 27017

**Verificar instalación:**
```powershell
# En PowerShell
mongod --version
```

### Paso 2: Crear el archivo .env

Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
PORT=3001
DB_CONNECTION_STRING=mongodb://localhost:27017/muebleria
```

**Nota:** `muebleria` es el nombre de la base de datos. Puedes cambiarlo si lo deseas.

### Paso 3: Iniciar MongoDB (si no está corriendo)

Si MongoDB no está corriendo como servicio:
```powershell
# Iniciar MongoDB manualmente
mongod
```

---

## ☁️ Opción 2: MongoDB Atlas (Gratis, en la nube) - RECOMENDADO

### Paso 1: Crear cuenta en MongoDB Atlas

1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratuita (no requiere tarjeta de crédito)
3. El plan gratuito (M0) es suficiente para desarrollo

### Paso 2: Crear un Cluster

1. Una vez dentro de MongoDB Atlas:
   - Haz clic en "Build a Database"
   - Selecciona el plan "FREE" (M0)
   - Elige una región cercana (ej: `us-east-1`)
   - Haz clic en "Create"

### Paso 3: Crear usuario de base de datos

1. En "Database Access" (menú lateral):
   - Haz clic en "Add New Database User"
   - Elige "Password" como método de autenticación
   - Crea un usuario y contraseña (guárdalos bien)
   - En "Database User Privileges", selecciona "Read and write to any database"
   - Haz clic en "Add User"

### Paso 4: Configurar IP Whitelist

1. En "Network Access" (menú lateral):
   - Haz clic en "Add IP Address"
   - Selecciona "Allow Access from Anywhere" (para desarrollo)
   - O agrega tu IP específica
   - Haz clic en "Confirm"

### Paso 5: Obtener la cadena de conexión

1. En "Database" (menú lateral):
   - Haz clic en "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión (se ve algo como):
     ```
     mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/
     ```
2. **IMPORTANTE:** Reemplaza `<password>` con tu contraseña real (sin los símbolos < >)
3. Agrega el nombre de la base de datos al final (ej: `muebleria`)

**Ejemplo final:**
```
mongodb+srv://miUsuario:miContraseña123@cluster0.xxxxx.mongodb.net/muebleria?retryWrites=true&w=majority
```

### Paso 6: Crear el archivo .env

Crea un archivo `.env` en la carpeta `backend/` con:

```env
PORT=3001
DB_CONNECTION_STRING=mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/muebleria?retryWrites=true&w=majority
```

**⚠️ IMPORTANTE:** 
- Reemplaza `usuario`, `contraseña` y la URL del cluster con tus valores reales
- Nunca subas el archivo `.env` a Git (ya está en .gitignore)

---

## 🧪 Verificar la conexión

Después de crear el archivo `.env`, inicia el servidor:

```powershell
cd backend
npm start
```

Si todo está bien configurado, verás:
```
✅ Conexión a MongoDB establecida correctamente
Base de datos conectada correctamente
Servidor corriendo en http://localhost:3001
```

Si hay un error, revisa:
- ✅ Que el archivo `.env` esté en la carpeta `backend/`
- ✅ Que la cadena de conexión sea correcta
- ✅ Que MongoDB esté corriendo (si es local)
- ✅ Que la IP esté permitida (si es Atlas)

---

## 📝 Ejemplo de archivo .env

```env
# Puerto del servidor
PORT=3001

# Cadena de conexión a MongoDB
# Para MongoDB Local:
# DB_CONNECTION_STRING=mongodb://localhost:27017/muebleria

# Para MongoDB Atlas:
# DB_CONNECTION_STRING=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/muebleria?retryWrites=true&w=majority
```

---

## ❓ ¿Cuál opción elegir?

- **MongoDB Local:** Si tienes MongoDB instalado o quieres aprender instalándolo
- **MongoDB Atlas:** Recomendado para desarrollo rápido, no requiere instalación, funciona desde cualquier lugar

