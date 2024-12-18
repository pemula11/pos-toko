var express = require('express');
var router = express.Router();
const warpAsync = require('../utils/wrapAsync');
const transactionController = require('../controllers/transactionController');

/* GET users listing. */
router.get('/', warpAsync(transactionController.getTransactions));
router.post('/', warpAsync(transactionController.createTransaction));

module.exports = router;
