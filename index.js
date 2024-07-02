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

// Log request origin
app.use((req, res, next) => {
    console.log('Request origin:', req.headers.origin);
    next();
});

app.use(cors({
    origin: "https://lutfi-script-client.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

app.use('/admin', AdminRouter);
app.use('/auth', UserRouter);
app.use('/auth/:id', UserRouter);
app.use('/modules', ModulesRouter);
app.use('/modules/:id', ModulesRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error("Connection error", err);
    });
