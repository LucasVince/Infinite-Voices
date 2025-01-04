"use strict";
const express = require('express');
const server = express();
server.use(express.json());
server.listen(8080, () => console.log('App rodando na porta 8080'));
