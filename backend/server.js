import express from 'express';
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from './config/enVars.js';
import { connectDB } from './config/db.js';
import upload from './middlewares/uploadMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import app from './src/app.js';
import cors from 'cors'


const app = express();
const PORT = ENV_VARS.PORT
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.json()); // will allow us to parse req.body
app.use("/api/v1/auth" ,authRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.listen(PORT, () =>{
    console.log('server started at http://localhost:'+ PORT);
    connectDB();
    
});