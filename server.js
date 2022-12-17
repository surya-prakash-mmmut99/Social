//if you use this way, then put this into json "type": "module",,
//if not use this way, then put this const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import UserRouter from './routes/userRoute.js';
import PostRouter from './routes/postRoute.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import StoryRouter from './routes/storyRoute.js';
mongoose.set('strictQuery', true)

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('./assets/images/upload', express.static(path.join(__dirname, '../frontend/public/assets/images/upload/')));

//only for post or put when we send data convert to object, only for post or put method
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//for image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/assets/images/upload/");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage});
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {

        return res.status(200).json('File uploaded successfully!');

    } catch(err) {
        console.log(err);
    }
})

//router
app.use('/api/users', UserRouter);
app.use('/api/posts', PostRouter);
app.use('/api/story', StoryRouter);
app.use('/api/reels', StoryRouter);
app.use(express.static(path.join(__dirname,"/frontend/build")));
app.get("*",function (req, res) {
  res.sendFile(path.join(__dirname,"/frontend/build/index.html"))
})

//connect with db
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to db!');
}).catch((error) => {
    console.log(error.message);
})

//create port
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})