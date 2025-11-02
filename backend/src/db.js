//En este archivo se realizara la conexion a la base de datos.
//Esto se hace aca para separar responsabilidades y que server.js se encargue unicamente de configurar el servidor.
const mongoose = require('mongoose');
const config = require('./utils/config.js');

const connectionString = config.databaseURL;

async function connectToDatabase() {
    if (!connectionString) {
        throw new Error("DB_CONNECTION_STRING no esta definido en el archivo .env")
    }

    try {
        await mongoose.connect(connectionString);
        console.log('✅ Conexión a MongoDB establecida correctamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error.message);
        throw error;
    }
}

module.exports = { connectToDatabase };