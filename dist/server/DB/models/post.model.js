"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const postModel = (0, mongoose_1.model)('Post', postSchema);
exports.default = postModel;
