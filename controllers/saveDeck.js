
const Flashcard = require('../Models/Flashcard');
const Deck = require('../Models/Deck');
const User = require('../Models/User');


const saveDeck = async (req, res) => {

    try {


        const { title, flashcards } = req.body;
        const userId = req.user.id;

        //Create deck
        const deck = await Deck.create({
            title: title,
            user: userId,
        });
        //Create all flashcards and link to the deck
        const savecards = await Flashcard.insertMany(
            flashcards.map(fc => ({
                question: fc.question,
                answer: fc.answer,
                user: userId,
                deck: deck._id
            }))
        );
        //Push flashcard IDs to the deck
        deck.flashcards.push(...savecards.map(card => card._id));//... spreac operator to insert multiple items at once

        await deck.save();  // 4 Save the deck with flashcard references updated

        //update user deck   //findByIdAndUpdate is just a shortcut for “find → modify → save”
        const user = await User.findById(userId);
        user.decks.push(deck._id);
        await user.save();

        res.status(201).json({
            success: true,
            deck
        });
        
    }
    catch (err) {
        console.log("save deck error:",err)
        res.status(500).json({
            success: false,
            error: "serevr serror"
        });
    }
    


}
module.exports = { saveDeck };