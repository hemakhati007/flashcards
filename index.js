const connectToMongo = require('./Db')
connectToMongo();//connection to db formed

const express = require('express');
const cors = require("cors");

const app = express();
const port = 5000;
// var cors=require('cors')
//url name api/auth hit

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true // if you send cookies/auth headers
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json()); // ✅ important for reading req.body
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/users",require("./Routes/users"));


app.listen(port, () => {
    console.log(`flashcard backend listening at http://localhost:${port}`);
}); 
   