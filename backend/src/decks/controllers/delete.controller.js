
const Deck = require("../deck.model.js");
const Flashcard = require("../../flashcards/flashcard.model.js");

const User = require('../../users/user.model.js');




const deleteDeck = async (req, res) => {
    try {
        const deckId = req.params.deckId;
        const userId = req.user.id;

        // 1. Find deck
        const deck = await Deck.findById(deckId);
        if (!deck) return res.status(404).json({ error: 'Deck not found' });

        console.log('req.user:', req.user);
        console.log('deck.user:', deck.user.toString());

        // 2. Check ownership
        if (!deck.user || deck.user.toString() !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // 3. Delete all flashcards in that deck
        await Flashcard.deleteMany({ deck: deckId });

        //4.remove deck from user
        await User.findByIdAndUpdate(userId, {
            $pull: { decks: deckId }
        });

        // 5. Delete the deck itself
        await Deck.findByIdAndDelete(deckId);

        res.json({ success: true, message: 'Deck deleted successfully' });

    }
    catch (err) {
        console.error('Delete Deck Error:', err);
        res.status(500).json({ error: 'Server error' });

    }
};
module.exports = { deleteDeck };
