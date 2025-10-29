//En este archivo se realizara la conexion a la base de datos.
//Esto se hace aca para separar responsabilidades y que server.js se encargue unicamente de configurar el servidor.
import mongoose from 'mongoose';
import { config } from './utils/config.js';

const connectionString = config.databaseURL;

export async function connectToDatabase() {
    if (!connectionString) {
        throw new Error("DATABASE_URL no esta definido")
    }

    await mongoose.connect(connectionString);
}