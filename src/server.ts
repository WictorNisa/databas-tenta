import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Request } from "express";
import cors from "cors";
import logger from './middleware/logger';
import productsRouter from "./routes/products";
import customersRouter from './routes/customers'
import analyticsRouter from './routes/analytics'
import authRouter from './routes/auth'
import dotenv from 'dotenv';
dotenv.config();
const app = express()
// console.log(process.env.JWT_SECRET);

//Body parser middleware
app.use(cors<Request>())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/products", productsRouter);
app.use('/customers', customersRouter)
app.use('/reviews', analyticsRouter)
app.use('/auth', authRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))