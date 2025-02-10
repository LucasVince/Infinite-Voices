"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    bio: {
        type: String, required: false, default: null
    },
    posts: {
        type: Number, required: true, default: 0
    },
    status: {
        type: String, required: true, default: 'online'
    },
    temporaryMessage: {
        type: String, required: false, default: null
    },
    createdAt: {
        type: Date, required: true, default: new Date()
    },
    avatar: {
        type: String, required: false, default: null
    }
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
