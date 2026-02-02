const mongoose = require('mongoose');
const { Schema } = mongoose;

// const User = require("../Models/User");//to get user info
// const Deck = require("../Models/Deck");//to get Deck info



const DeckSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flashcards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flashcard' // <-- ✅ place ref inside the array of objects
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Deck', DeckSchema);
