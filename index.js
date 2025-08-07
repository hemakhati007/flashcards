const connectToMongo = require('./Db')
connectToMongo();//connection to db formed

const express = require('express');

const app = express();
const port = 5000;
// var cors=require('cors')
//url name api/auth hit

app.use(express.json()); // ✅ important for reading req.body
app.use("/api/auth", require("./Routes/auth"));



app.listen(port, () => {
    console.log(`flashcard backend listening at http://localhost:${port}`);
}); 
  