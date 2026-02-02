//fetch user
//autheticate the token in req
require('dotenv').config();
const jwt = require("jsonwebtoken");



const fetchuser = (req, res, next) => {

    // //GET THE USER FROM JWT TOKEN AND ADD ID  TO req obj

    // const token = req.header('auth-token')


    // GET TOKEN FROM COOKIE
    const token = req.cookies?.token; // 'token' is the cookie name you set in backend
    if (!token) {
        console.log('token error');
        return res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        // console.log("yessssssssssssss");
        next();//next() is a function that passes control to the next middleware or route handler in the stack.
    }
    catch (error) {

       return  res.status(401).send({ error: "please authenticate using a valid token" })

    }
   
}

module.exports = fetchuser;
