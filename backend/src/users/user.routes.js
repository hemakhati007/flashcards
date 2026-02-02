

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //user verfication


//controllers
const { getUserProfile } = require('./controllers/getProfile.controller.js');
const { uploadProfileImage } = require('./controllers/uploadProfile.controller.js');


//we will get user profile via a controller -->logicin seprate file
router.get(
    '/profile', fetchuser, getUserProfile
);

// Upload route (controller handles logic)

const multer = require("multer");
const path = require("path");


// Configure storage
const storage = multer.diskStorage({
    // Where to save uploaded files
    destination: (req, file, cb) => cb(null, "uploads/"),

    // How to name the file when saving
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
        // Example: 1692549903911.png
    },
});

const upload = multer({ storage });

router.post("/upload", fetchuser, upload.single("image"), uploadProfileImage);

module.exports = router;