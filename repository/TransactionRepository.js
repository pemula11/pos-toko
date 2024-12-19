const {Transaction} = require('../models');

class TransactionRepository {
    async findAll(){
        return await Transaction.findAll({
            include: [Transaction.User]
        });
    }

    async findOne(id){
        return await Transaction.findOne({
            where: {
                id: id
            },
            include: [{
                association: 'user',
                attributes: [ 'id', 'name', 'email' ]},
                {
                association: 'transactionDetails',
                attributes: [ 'id', 'productId', 'price', 'quantity', 'subtotal' ],
                include: [ {
                     association: 'product',
                    attributes: [ 'name'] } ],  
                }]
        }).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
        })
    }
    async create(transaction){
        try {
            return await Transaction.create(transaction);
        }
        catch (error){
            console.error("Failed to create transaction. Error: ", error);
            throw new Error("Failed to create transaction");
        }
    }
    async findByUserId(userId){
        return await Transaction.findAll({
            where: {
                userId: userId
            }
        }).catch((error) => {
            console.error("Failed fetch data from database. Error: ", error);
            throw new Error("Failed fetch data from database");
        })
    }
    async delete(transaction){
        try {
            Transaction.destroy({
                where: {
                    id: transaction.id
                }
            });
        } catch (error) {
            console.error("Failed to Delete transaction. Error: ", error);
            throw new Error("Failed to Delete transaction");
        }
    }
    // async createWithDetail(transaction, details){
    //     try {
    //         const transactionData = await Transaction.create(transaction, 
    //             details,
    //             { include: ['transactionDetails'] });
    //         return transactionData;
    //     }
    //     catch (error){
    //         console.error("Failed to create transaction. Error: ", error);
    //         throw new Error("Failed to create transaction");
    //     }
    // }


    
}

module.exports = new TransactionRepository();