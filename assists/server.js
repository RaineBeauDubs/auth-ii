const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/api', authRouter);

server.get('/', (req, res) => {
  res.send("IT'S WORKING!");
});

module.exports = server;