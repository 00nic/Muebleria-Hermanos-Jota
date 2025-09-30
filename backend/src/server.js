const express = require("express");
const logger = require("./middlewares/logger.js");
const manejadorRutas = require("./middlewares/rutaInexistente.js");
const manejadorErrores = require("./middlewares/manejadorCentralizado.js");
const productosRoutes = require("./routes/productosRoutes.js");
const usuariosRoutes = require("./routes/usuariosRoutes.js");
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger);

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenido al servidor de Mueblería Jota!");
});

app.use("/api/productos", productosRoutes);

app.use("/api/usuarios", usuariosRoutes);

app.use(manejadorRutas);

app.use(manejadorErrores);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
