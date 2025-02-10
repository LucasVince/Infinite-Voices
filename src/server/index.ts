const dotenv = require('dotenv');
dotenv.config();

import connection from'./DB/connect';

const express = require('./modules/serverExpress');

connection();