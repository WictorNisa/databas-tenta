import express from 'express'
import logger from './middleware/logger';
import productsRouter from "./routes/products";
const app = express()

app.get('/test', (req, res) => {
    console.log('Test route hit');
    res.send('Test route works!');
});

//Body parser middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/products", productsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))