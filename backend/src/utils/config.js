require('dotenv').config();

//recordar crear archivo .env y agregar el url de la base de datos en DB_CONNECTION_STRING
const config = {
    databaseURL: process.env.DB_CONNECTION_STRING,
    port: process.env.PORT || 3001
}

module.exports = config;