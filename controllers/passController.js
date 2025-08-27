
const User = require("../Models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
require('dotenv').config(); // at the top

const crypto = require("crypto");
const generateToken = () => crypto.randomBytes(32).toString("hex");

//forget password
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    console.log("eneterd");

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = generateToken();
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        // Save token & expiry to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Send email
     
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });

        transporter.verify((err, success) => {
            if (err) {
                console.error("Auth failed:", err);
            } else {
                console.log("Ready to send emails:", success);
            }
        });
       
        const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Click here to reset your password: ${resetURL}`,
        });

        res.json({ success: true, message: "Password reset email sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {requestPasswordReset};