const express = require('express');
const app = express();
const router = express.Router();
const transactionController = require('../Controllers/transactionController');

router.get('/transactions', transactionController.getTransactions);
router.post('/create/transactions', transactionController.createTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

module.exports = router;
