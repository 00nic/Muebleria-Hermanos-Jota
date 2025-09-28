const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

//const logger = require('./middlewares/logger.js');
//app.use(logger);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de Mueblería Jota!');
});

const productosRoutes = require('./routes/productosRoutes.js')
app.use('/api/productos', productosRoutes);

const usuariosRoutes = require('./routes/usuariosRoutes.js')
app.use('/api/usuarios', usuariosRoutes);

const manejadorRutas= require('./middlewares/rutaInexistente.js')

app.use(manejadorRutas)

const manejadorErrores = require('./middlewares/manejadorCentralizado.js');
app.use(manejadorErrores);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})