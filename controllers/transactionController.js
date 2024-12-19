const transactionService = require('../services/transactionService');
const validator = require('fastest-validator');
const v = new validator();

module.exports.getTransactions = async (req, res) => {
    const transactions = await transactionService.findAll();
    return res.json({
        status: 'success',
        data: transactions
    });
}

module.exports.getTransaction = async (req, res) => {
    const {id} = req.params;
    const transaction = await transactionService.findOne(id);
    if (!transaction) {
        return res.status(404).json({
            status: 'error',
            message: 'Transaction not found'
        });
    }
    return res.json({
        status: 'success',
        data: transaction
    });
}

module.exports.createTransaction = async (req, res) => {
   const schema = {
       user_id: 'string|empty:false',
   }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const {user_id, details, transtion_date} = req.body;
    if (details.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Details is required'
        });
    }

    const transaction = await transactionService.makeTransactionWithDetail(new Date(), details, user_id);
    return res.json({
        status: 'success',
        data: transaction
    });
}