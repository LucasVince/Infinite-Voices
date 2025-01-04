"use strict";
const userModelMongoose = require('mongoose');
const userSchema = new userModelMongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const userModel = userModelMongoose.model('user', userSchema);
module.exports = userModel;
