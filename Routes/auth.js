//authentucation
//1.creating new user
//2.login
//3.logined user


const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//body helps in putting checks in data sent/resceived through get,post,put,delete eg islength,isemail..
//validationResult is to gather the result of validation and handle any error

const bcrypt = require('bcryptjs');//hashing the password
const User = require("../Models/User");
//dealing with user creation and validation(user data)
//for having seesions
const jwt = require("jsonwebtoken");
//create you signature --a secret
const JWT_SECRET = "iamagood$girl";//need to be in differnet file 

// 1.creating user/registration
//no login required //creating a user or adding
//CREATE A USER USING: POST "/Routes/auth"

router.post(
    "/createuser",//url to hit on registration?
    [
        body("name", "Enter valid name").isLength({ min: 3 }),
        body("email", "Enter valid email").isEmail(),
        body("password","password at least 8 charcters").isLength({min:8}),
    ],
    //create using this callback
    async (req, res) => {
        //if there  are errors ,return  Bad request with errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        //creating the instance of User model ,each instance is the object in users collection in flashcardsDb
    
        //check wether the user with that email already exist
        try {
            let user = await User.findOne({ email: req.body.email });//its apromise
            // let success;
            if (user) {//exist
                return res
                    .status(400)
                    .json({ error: "sorry user with  this email exist" });
            }
            //do not exits

            //hash the password
            const salt = await bcrypt.genSalt(10);//salt of 10 len
            secPass = await bcrypt.hash(req.body.password, salt); //returns promise
        

            

            //create user and saves to USER db
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });

            //creating JWT session token so by token server can authenticate user without putting credential
            //the token will be in client req authorization header,onn req to the page ut will get varaifiedd server and givve the user data 
            //so we will send back the toekn to client so it can store it and on next req it do not need to renetr credentials
            const data = {
                user: {
                    id: user.id,
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            //return suceess response
            res.status(201).json({ success: true, message: 'User created successfully',authtoken });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured");
        }

    }
);

//jwt token will be used in time of login too ,it will be created and stored in client isde for future no credtial need
// 2.Login end point
//authentication of user uring POST:"/api/auth/login"

router.post(
    "/login",
    [
        body("email", "enter valid email").isEmail(),
        body("password", "password cant be blank").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        //varification email and password
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "please try login with correct credentials" });
            }

            const passwordCompare = bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "please try to login with correct credentials" });
            }
            //for seesion creation
            const payload = {
                user: {
                    id: user.id,
                },
            };

            const authtoken = jwt.sign(payload, JWT_SECRET);
            res.status(200).json({ sucess: true, msg: "login", authtoken });

        } catch (err) {

            console.error(err.message);
            res.status(500).send("internal server error occured");
        }
    }
);


//3.logedin :get user data
// //Route:3  get logined user detatil  using "/api/auth/getuser"  login required
//here the middleware will verifies the auth token and return user data


const fetchuser = require('../middleware/fetchuser'); // JWT middleware
router.post(
    "/getuser",
    fetchuser, async (req, res) => {
        try {
            const userId = req.user.id;// fetchuser middleware sets req.user

            const user = await User.findById(userId).select("-password");// exclude password
            res.send(user);
        }
        catch (err) {
            console.error(error.message);
            res.status(500).send("internal server  error occured");
        }
    }
    
);


// Using POST is okay here since you're not passing any data in the body and want to keep it protected behind middleware.
module.exports = router;

