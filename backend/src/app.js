import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js'; // Adjust import paths
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1', uploadRoutes);
app.use("/api/v1/auth" ,authRoutes);

console.log('Routes mounted at /api/v1');
export default app;
