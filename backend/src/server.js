const express = require('express');
const cors = require('cors');
const config = require('./utils/config.js');

//La conexion a mongoDB se realiza en db.js
const { connectToDatabase } = require('./db.js');
const PORT = config.port || 3001;

const logger = require("./middlewares/logger.js");
const manejadorRutas = require("./middlewares/rutaInexistente.js");
const manejadorErrores = require("./middlewares/manejadorCentralizado.js");
const productosRoutes = require("./routes/productosRoutes.js");
const usuariosRoutes = require("./routes/usuariosRoutes.js");

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor de Mueblería Jota!");
});

app.use("/api/productos", productosRoutes);

app.use("/api/usuarios", usuariosRoutes);

app.use(manejadorRutas);

app.use(manejadorErrores);

connectToDatabase()
  .then(() => {
    console.log("Base de datos conectada correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
  })
  .catch((err) => {
    console.log("Error al conectar a la base de datos", err.message);
    process.exit(1);
  })