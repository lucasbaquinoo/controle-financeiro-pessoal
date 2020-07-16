const express = require('express');
const transactionRouter = express.Router();

const controller = require('../controller/transactionController');

transactionRouter.post('/transaction', controller.create);
transactionRouter.get('/transaction', controller.findAll);
transactionRouter.get('/transaction/:id', controller.findOne);
transactionRouter.put('/transaction/:id', controller.update);
transactionRouter.delete('/transaction/:id', controller.remove)


module.exports = transactionRouter;
