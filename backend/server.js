// import express from 'express';
// import authRoutes from "./routes/auth.route.js";
// import { ENV_VARS } from './config/enVars.js';
// import { connectDB } from './config/db.js';
// import upload from './middlewares/uploadMiddleware.js';
// import uploadRoutes from './routes/uploadRoutes.js';
// // import app from './src/app.js';
// import cors from 'cors'


// const app = express();
// const PORT = ENV_VARS.PORT;



// const allowedOrigins = [
//     'http://lightstreams.vercel.app', // Production frontend URL
//     'http://localhost:5173'          // Local development URL
// ];

// app.use(cors({
//     origin: (origin, callback) => {
//         // Allow requests with no origin (e.g., for testing with Postman)
//         if (!origin) return callback(null, true);

//         // Check if the request origin is in the allowedOrigins array
//         if (allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         }

//         // Block requests from unapproved origins
//         return callback(new Error('Not allowed by CORS'));
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
//     credentials: true, // Allow credentials (cookies, headers, etc.)
// }));

// app.use((req, res, next) => {
//     console.log('Request Origin:', req.headers.origin);
//     next();
// });

// app.use(express.json()); // will allow us to parse req.body
// app.use("/api/v1/auth" ,authRoutes);
// app.use("/api/v1/upload", uploadRoutes);

// app.listen(PORT, () =>{
//     console.log('server started at http://localhost:'+ PORT);
//     connectDB();
//     n
// });

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { connectDB } from './config/db.js';
import { ENV_VARS } from './config/enVars.js';

const app = express();
const PORT = ENV_VARS.PORT;

// Allowed origins
const allowedOrigins = [
    'http://lightstreams.vercel.app', // Production frontend
    'http://localhost:5173'          // Local development
];

// CORS Middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin (e.g., Postman)
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies and headers
}));

app.options('*', cors()); // Handle preflight requests

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectDB();
});
