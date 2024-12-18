const {TransactionDetail} = require('../models');

class TransactionDetailRepository {
    async findAll(){
        return await Transaction.findAll({
            include: ['user', 'transactionDetails']
        });
    }

    async findOne(id){
        return await Transaction.findOne({
            where: {
                id: id
            },
            include: ['transaction']
        }).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
        })
    }
    async create(transactionDetail){
        try {
            console.log("TransactionDetail: ", transactionDetail);
            return await TransactionDetail.create(transactionDetail);
        }
        catch (error){
            console.error("Failed to create transaction detail. Error: ", error);
            throw new Error("Failed to create transaction detail");
        }
    }
    async findByTransactionId(transactionId){
        return await TransactionDetail.findAll({
            where: {
                transactionId: transactionId
            }
        }).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
        })
    }
    async delete(transactionDetail){
        try {
            TransactionDetail.destroy({
                where: {
                    id: transactionDetail.id
                }
            });
        } catch (error) {
            console.error("Failed to Delete transaction detail. Error: ", error);
            throw new Error("Failed to Delete transaction detail");
        }
    }
    
    
}

module.exports = new TransactionDetailRepository();