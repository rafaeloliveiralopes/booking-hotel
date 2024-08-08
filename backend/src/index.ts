import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Permiti o envio de credenciais (cookies, cabeçalhos de autenticação)
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

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
