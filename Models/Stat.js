// statistics/accuracy/performance

const mongoose = require('mongoose');
const StatsSchema = new mongoose.Schema({
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accuracy: { type: Number, required: true }, // percentage like 85
    totalCards: { type: Number, required: true },
    correctCards: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Stat', StatsSchema);