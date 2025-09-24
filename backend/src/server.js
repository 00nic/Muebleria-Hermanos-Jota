const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const logger = require('./middlewares/logger.js');
app.use(logger);

const productosRoutes = require('./routes/productosRoutes.js')

app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de Mueblería Jota!');
});

app.use('/api/productos', productosRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})