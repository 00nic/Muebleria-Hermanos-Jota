import mongoose from 'mongoose';
import { config } from './utils/config.js';

const connectionString = config.databaseURL;

export async function connectToDatabase() {
    if (!connectionString) {
        throw new Error("DATABASE_URL no esta definido")
    }

    await mongoose.connect(connectionString);
}