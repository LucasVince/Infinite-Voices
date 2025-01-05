"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const postSchema = new mongoose_1.Schema({});
const postModel = (0, mongoose_1.model)('Post', postSchema);
exports.default = postModel;
