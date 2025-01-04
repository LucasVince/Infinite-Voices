const dotenv = require('dotenv');
dotenv.config();

const DBConnection = require('./DB/connect');

const Express = require('./modules/express');

DBConnection();