import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Permitir apenas esta origem
  credentials: true, // Permitir o envio de credenciais (cookies, cabeçalhos de autenticação)
};

app.use(cors(corsOptions)); // Aplicar as opções de CORS

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.log(`Failure upon starting server`);
  }
});

// API routes endpoints
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
