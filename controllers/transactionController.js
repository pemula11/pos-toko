const transactionService = require('../services/transactionService');
const validator = require('fastest-validator');
const v = new validator();

module.exports.getTransactions = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const transactions = await transactionService.findAll(limit, startIndex);
    const total = await transactionService.countData();
    return res.json({
        status: 'success',
        data: transactions,
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit),
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
       details: 'array|empty:false',

   }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const { details} = req.body;
    if (details.length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Details is required'
        });
    }

    const user_id = req.user.data.user_id;

    

    const transaction = await transactionService.makeTransactionWithDetail(new Date(), details, user_id);
    return res.json({
        status: 'success',
        data: transaction
    });
}