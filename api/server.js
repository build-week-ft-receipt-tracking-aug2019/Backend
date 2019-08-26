const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const logger = (req, res, next) => {
    console.log(`${req.method} request was made to ${req.url}`)
    next();
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

module.exports = server;
