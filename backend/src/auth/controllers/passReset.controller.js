require('dotenv').config();
const User = require("../../users/user.model.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");






// Helper to generate token
const generateToken = () => crypto.randomBytes(32).toString("hex");
const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // token not expired
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    //   /hash the password
        const salt = await bcrypt.genSalt(10);//salt of 10 len
        secPass = await bcrypt.hash(password, salt); //returns promise
              
        user.password = secPass;

        // Remove token & expiry after successful reset
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        //   //creating JWT session token so by token server can authenticate user without putting credential
        //     //the token will be in client req authorization header,onn req to the page ut will get varaifiedd server and givve the user data 
        //     //so we will send back the toekn to client so it can store it and on next req it do not need to renetr credentials
        //     const data = {
        //         user: {
        //             id: user.id,
        //         }
        //     };
        //     const authtoken = jwt.sign(data, JWT_SECRET);

        //     // Set the token in an HTTP-only cookie
        //     res.cookie("token", authtoken, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === "production", // secure only in prod
        //         sameSite: "lax",
        //         maxAge: 3600000 // 1 hour
        //     });
        

        res.json({ success: true, message: "Password reset successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { resetPassword };