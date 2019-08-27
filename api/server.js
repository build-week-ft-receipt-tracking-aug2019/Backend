const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router');
const restricted = require('../auth/auth-middleware');
const receiptRouter = require('../receipts/receipts-router');
const server = express();

const logger = (req, res, next) => {
    console.log(`${req.method} request was made to ${req.url}`)
    next();
};

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.use('/', authRouter);
server.use('/users', restricted, receiptRouter);

module.exports = server;
