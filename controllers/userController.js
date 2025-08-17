//to get user info
const User = require('../Models/User');
const Deck = require("../Models/Deck");//to get Deck info


const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password").populate({
            path: 'decks',//require Deck
            select: 'title'
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ success:false, message: 'Server error' });
    }
}

module.exports = { getUserProfile };