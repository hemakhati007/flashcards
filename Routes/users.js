
//to acess authorized user profile and flashcards it own and stats

//to get authorized user after login 

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser"); //user verfication

// const User = require("../Models/User");//to get user info
// const Deck = require("../Models/Deck");//to get Deck info
const { getUserProfile } = require('../controllers/userController');
const { getDeck } = require('../controllers/flashcardContoller');

const { generateDeck } = require('../controllers/generateDeck');

const { saveDeck } = require('../controllers/saveDeck');


//we will get user profile via a controller -->logicin seprate file
router.get(
    '/profile', fetchuser, getUserProfile
);

// fetch deck
router.get('/deck/:deckId', fetchuser, getDeck);//fectch//delete/update
// delete deck
// router.put('/deck/:deckId/delete', fetchuser, deleteDeck);

router.post('/generate', fetchuser, generateDeck);

router.post('/savedeck', fetchuser, saveDeck);

module.exports = router;
 