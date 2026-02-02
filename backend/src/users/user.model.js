//users

const mongoose = require('mongoose');

const { Schema } = mongoose;//imposrting Schema
//schema to define database structure;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },//an array of objectid of deck

        // 👇 add these for reset password
        resetPasswordToken: {
            type: String,
            default: null
        },
        resetPasswordExpires: {
            type: Date,
            default: null
        },
        decks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Deck'  // <-- this links user to their decks
        }],
        image: {
            type: String,
            default: "/uploads/default.png" // 👈 fallback if no image uploaded
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    }
);

module.exports = mongoose.model("User", UserSchema);
// "User" will be the name of the MongoDB collection (in lowercase and plural: users) and should always be a string, not a variable.
// Mongoose automatically:

// Uses User(model name)

// Converts it to lowercase and plural: users

// That becomes your MongoDB collection name

// ✅ User → collection: users

// So you don't need to write users explicitly anywhere.