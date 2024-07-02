import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
import { UserRouter } from './routes/user.js';
import { ModulesRouter } from './routes/modules.js';
import { AdminRouter } from './routes/admin.js';

const app = express();

// Log requests and CORS headers
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    res.setHeader("Access-Control-Allow-Origin", "https://lutfi-script-client.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(cors({
    origin: ["https://lutfi-script-client.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

app.use('/admin', AdminRouter);
app.use('/auth', UserRouter);
app.use('/auth/:id', UserRouter);
app.use('/modules', ModulesRouter);
app.use('/modules/:id', ModulesRouter);

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
