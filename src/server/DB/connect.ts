const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@infinitevoices.yxpn2.mongodb.net/?retryWrites=true&w=majority&appName=InfiniteVoices`);
        console.log('DB connection established');
    } catch(err) {
        console.log(`error connecting to DB: ${err}`);
    }
}

module.exports = connection;