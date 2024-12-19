import express from 'express';
import authRoutes from "./routes/auth.route.js";
import { ENV_VARS } from './config/enVars.js';
import { connectDB } from './config/db.js';
import upload from './middlewares/uploadMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import app from './src/app.js';
import cors from 'cors'


const app = express();
const PORT = ENV_VARS.PORT;



const allowedOrigins = [
    'http://lightstreams.vercel.app', // Production frontend URL
    'http://localhost:5173'          // Local development URL
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., for testing with Postman)
        if (!origin) return callback(null, true);

        // Check if the request origin is in the allowedOrigins array
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Block requests from unapproved origins
        return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
}));



app.use(express.json()); // will allow us to parse req.body
app.use("/api/v1/auth" ,authRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.listen(PORT, () =>{
    console.log('server started at http://localhost:'+ PORT);
    connectDB();
    
});