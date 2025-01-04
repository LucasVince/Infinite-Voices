const dotenv = require('dotenv');
dotenv.config();

import connection from'./DB/connect';

const Express = require('./modules/serverExpress');

connection();