
//to acess authorized user profile and flashcards it own and stats

//to get authorized user after login 

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //user verfication


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


//controllers
const { getUserProfile } = require('../controllers/userController');
const { getDeck } = require('../controllers/flashcardContoller');
const { deleteDeck } = require('../controllers/deleteDeck');
const { generateDeck } = require('../controllers/generateDeck');

const { saveDeck } = require('../controllers/saveDeck');

const { updateFlashcardAnswer } = require('../controllers/updateFlashAnswer');
const { getDeckAccuracy } = require('../controllers/getDeckAccuracy');
const { uploadProfileImage } = require('../controllers/uploadController');

// ---------------- ROUTES ---------------- //

//we will get user profile via a controller -->logicin seprate file
router.get(
    '/profile', fetchuser, getUserProfile
);

// fetch deck
router.get('/deck/:deckId', fetchuser, getDeck);//fectch//delete/update
// delete deck
router.delete('/deck/:deckId/delete', fetchuser, deleteDeck);
// generate flashcards
router.post('/generate', fetchuser, generateDeck);
// save deck
router.post('/savedeck', fetchuser, saveDeck);

// update flashcard answer
router.put('/flashcards/:flashId/answer', fetchuser, updateFlashcardAnswer);
// deck accuracy
router.get('/deck/:deckId/accuracy', fetchuser, getDeckAccuracy);

// Upload route (controller handles logic)
router.post("/upload", fetchuser, upload.single("image"), uploadProfileImage);


module.exports = router;
 