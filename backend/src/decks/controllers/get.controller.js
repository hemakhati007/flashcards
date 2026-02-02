const Deck = require("../deck.model.js");
const Flashcard = require("../../flashcards/flashcard.model.js");

console.log("enterd");
const getDeck = async (req, res) => {
    
    try {
        // console.log("yee");
        const deckId = req.params.deckId;
        
        const userId = req.user.id;
        const deck = await Deck.findOne({ _id: deckId, user: userId }).populate("flashcards");
        if (!deck) {
            // console.log("hii");
            return res.status(404).json({ error: 'deck not found' });
        }

        if (deck.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        res.json({success:true,flashcards: deck.flashcards,title:deck.title});
        // res.json({ success: true });
    }
    catch (err) {
        console.error('Get Flashcards Error:', err);
        res.status(500).json({ error: 'Server error' });
    }

    
};

module.exports = { getDeck }; 