
const express = require("express");
const router = express.Router();

//middleware
const fetchuser = require("../middleware/fetchuser"); //user verfication
//controllers

const { getDeck } = require("./controllers/get.controller.js");
const { deleteDeck } = require('./controllers/delete.controller.js');
const { generateDeck } = require('./controllers/generate.controller.js');
const { saveDeck } = require('./controllers/save.controller.js');



// fetch deck
router.get('/deck/:deckId', fetchuser, getDeck);

// delete deck
router.delete('/deck/:deckId/delete', fetchuser, deleteDeck);

// generate flashcards
router.post('/generate', fetchuser, generateDeck);

// save deck
router.post('/savedeck', fetchuser, saveDeck);

module.exports = router;