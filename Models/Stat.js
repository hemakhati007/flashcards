// statistics/accuracy/performance

const mongoose = require('mongoose');
const StatsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalReviewed: Number,
    correctAnswers: Number,
    accuarcy: Number
});
module.exports = mongoose.model('Stats', StatsSchema);