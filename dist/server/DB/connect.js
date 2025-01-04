"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@infinitevoices.yxpn2.mongodb.net/?retryWrites=true&w=majority&appName=InfiniteVoices`);
        console.log('DB connection established');
    }
    catch (err) {
        console.log(`error connecting to DB: ${err}`);
    }
});
module.exports = connection;
