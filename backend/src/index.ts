import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/users';

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.log(`Failure upon starting server`);
  }
});

app.use('/api/users', userRoutes);
