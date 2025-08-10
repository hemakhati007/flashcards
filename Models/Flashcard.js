//flashcards respective to users

const mongoose = require('mongoose');

// const User = require("../Models/User");//to get user info
// const Deck = require("../Models/Deck");//to get Deck info


const FlashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,//its like a foreign key
        ref: 'User',
        required: true
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required:true
    },
    isCorrect: {
        type: Boolean,
        default: null//later will be filled after swip left/right 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Flashcard', FlashcardSchema);