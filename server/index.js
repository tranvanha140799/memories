import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // thư viện thao tác với file .env

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config(); // ~ import biến từ file .env

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT;

mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () => console.log(`Server's running on port: ${PORT}`))
    )
    .catch((error) => console.log(error.message));

//  mongoose.set('useFindAndModify', false);
