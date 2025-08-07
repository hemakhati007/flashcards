//flashcards respective to users

const mongoose = require('mongoose');
const FlashcardShcema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.type.ObjectId,//its like a foreign key
        ref: 'User',
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: null//later will be filled after swip left/right 
    },
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Flashcard', FlashcardSchema);