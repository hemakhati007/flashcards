 

const Deck = require('../Models/Deck');
const Flashcard = require('../Models/Flashcard');
const Stat = require('../Models/Stat');

const getDeckAccuracy = async (req, res) => {
    const { deckId } = req.params;
    const userId = req.user.id;

    try {
        const flashcards = await Flashcard.find({ deck: deckId, user: userId });
        console.log(flashcards);
        if (flashcards.length === 0) {
            return res.status(404).json({ error: "No flashcards found" });
        }

        // const answered = flashcards.filter(fc => fc.isCorrect !== null);
        const totalCards = flashcards.length;
        const correctCards = flashcards.filter(fc => fc.isCorrect).length;
        // console.log(correctCards);
        const accuracy = totalCards > 0
            ? (correctCards / totalCards) * 100
            : 0;
        
        
        const stat1=await Stat.create({
            deck: deckId,
            user: userId,
            accuracy,
            totalCards,
            correctCards,
        });
        // console.log(stat1);
        

        res.json({
            total: totalCards,
            // answered: answered.length,
            correct: correctCards,
            accuracy: `${accuracy.toFixed(2)}%`
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getDeckAccuracy };
