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
app.use(express.json());
app.use(cors({
    origin: "https://lutfi-script-client.vercel.app",
    methods : ["GET", "POST", "PATCH", "DELETE"],
    credentials : true
}));

app.use(cookieParser())
app.use('/admin', AdminRouter )
app.use('/auth', UserRouter)
app.use('/auth/:id', UserRouter)
app.use('/modules',ModulesRouter )
app.use('/modules/:id',ModulesRouter )

// mongoose.connect('mongodb://127.0.0.1:27017/lutfiscript')
//     .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//     });
// }).catch(err => {
//     console.error("Connection error", err);
// });

app.listen(process.env.PORT, () => {
    console.log(`app is running`)
})
