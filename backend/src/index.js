

import connectToMongo from './config/Db.js';
connectToMongo();//connection to db formed

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('./src/config/.env') }); // load env first

console.log(
    'Cohere key:',
    process.env.CO_API_KEY ? 'LOADED' : 'MISSING'
);
 
import express from 'express';
import cors from 'cors';
// a middleware for handling file uploads in Node.js.


const app = express();
app.use(express.json());
const port = 5000;
// var cors=require('cors')
//url name api/auth hit


app.use("/uploads", express.static("uploads"));

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // if you send cookies/auth headers
}));

import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(express.json()); // ✅ important for reading req.body
import authRoutes from './auth/auth.routes.js';
import userRoutes from './users/user.routes.js';
import deckRoutes from './decks/deck.routes.js';


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/users', deckRoutes); 

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.listen(port, () => {
    console.log(`flashcard backend listening at http://localhost:${port}`);
}); 
   