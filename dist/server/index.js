"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
const connect_1 = __importDefault(require("./DB/connect"));
const express = require('./modules/serverExpress');
(0, connect_1.default)();
