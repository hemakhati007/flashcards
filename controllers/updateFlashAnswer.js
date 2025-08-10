 
// const User = require('../Models/User');
const Flashcard = require('../Models/Flashcard');

const updateFlashcardAnswer = async (req, res) => {
    
    const flashId = req.params.flashId;
    const userId = req.user.id;
    const isCorrect = req.body.isCorrect;

    try {
        // Only allow updating if the flashcard belongs to the logged-in user
        const flashcard = await Flashcard.findOne({ _id: flashId, user: userId });
        if (!flashcard) {
            return res.status(404).json({ error: "Flashcard not found" });
        }
        flashcard.isCorrect = isCorrect;
        await flashcard.save();
        res.json({ success: true, flashcard });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

};
module.exports = { updateFlashcardAnswer };
