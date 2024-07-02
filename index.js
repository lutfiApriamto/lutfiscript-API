import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import { ModulesRouter } from './routes/modules.js';
import { AdminRouter } from './routes/admin.js';

const app = express();

// Load environment variables from .env file
dotenv.config({ path: "./config/.env" });

// Middleware CORS
app.use(cors({
    origin: "https://lutfi-script-client.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Log requests
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Routes
app.use('/admin', AdminRouter);
app.use('/auth', UserRouter);
app.use('/auth/:id', UserRouter);
app.use('/modules', ModulesRouter);
app.use('/modules/:id', ModulesRouter);

// Connect to MongoDB and start the server
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error("Connection error", err);
    });
