import express from 'express';
import { config } from 'dotenv';
import dbConnection from './database/config';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

import cors from 'cors';

config();
dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_,response) => {
	response.send({message: "Server Running Successfully"})
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

app.listen(process.env.PORT || 5000, () => {
	console.log(`Server is running on PORT: ${process.env.PORT || 5000}`);
});