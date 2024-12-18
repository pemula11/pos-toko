const TransactionDetailRepository = require('../repository/TransactionDetailRepository');

class TransactionDetailService {
    async findAll(){
        return await TransactionRepository.findAll();
    }

    async findOne(id){
        return await TransactionRepository.findOne(id);
    }

    async create(transaction){
        return await TransactionRepository.create(transaction);
    }

    
}

module.exports = new TransactionDetailService();