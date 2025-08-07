//users

const mongoose = require('mongoose');

const { Schema } = mongoose;//imposrting Schema
//schema to define database structure;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            requires: true
        },
        email: {
            type: String,
            requires: true,
            unique: true
        },
        password: {
            type: String,
            require: true
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