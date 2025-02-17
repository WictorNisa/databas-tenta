import express from 'express'
import logger from './middleware/logger';
import productsRouter from "./routes/products";
import customersRouter from './routes/customers'
const app = express()


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/products", productsRouter);
app.use('/customers', customersRouter)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))