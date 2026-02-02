const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/flashcardDB"
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    catch (err) {

        console.log("failed:failed to connect",err);
        
    }
}

module.exports = connectToMongo;