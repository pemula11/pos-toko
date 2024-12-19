const TransactionRepository = require('../repository/TransactionRepository');
const TransactionDetailRepository = require('../repository/TransactionDetailRepository');
const UserRepository = require('../repository/UserRepository');

const validator = require('fastest-validator');
const ExpressError = require('../utils/ExpressError');
const productServices = require('./productServices');
const v = new validator();

class TransactionService {
    async findAll(){
        return await TransactionRepository.findAll();
    }

    async findOne(id){
        if (!this.validateUUID(id)) {
            throw new ExpressError('Invalid ID', 400);
        }

        return await TransactionRepository.findOne(id);
    }

    async create(transaction){
        return await TransactionRepository.create(transaction);
    }

    async makeTransactionWithDetail(transactionDate, details, userId){
        const user = await UserRepository.findOne(userId);
        if (!user){
            throw new ExpressError('User not found', 404);
        }

        const schema = {
            price: 'number|empty:false|default:0|min:1',
            quantity: 'number|default:0',
            subtotal: 'number|default:0',
            productId: 'string|empty:false',
        }
        
        let total = 0;
        const products = [];
        for (const element of details){
            const validate = v.validate(element, schema);
            if (validate.length){
                throw new ExpressError(`Invalid data, ${validate}`, 400);
            }
            const product = await productServices.findOne(element.productId);
            if (!product){
                throw new ExpressError('Product not found', 404);
            }
            if (product.stock < element.quantity){
                throw new ExpressError('Product out of stock', 400);
            }
            product.stock -= element.quantity;
            products.push(product);


            total += element.subtotal;
        };

        products.forEach(async product => {
           await productServices.updateDirect(product, {stock: product.stock});
        })

        const transaction = await this.create({
            transactionDate: transactionDate,
            totalAmount: total,
            createdBy: userId
        });

        details.forEach(async detail => {
            await TransactionDetailRepository.create({
                ...detail, TransactionId: transaction.id
            })
        });


        return transaction;


    }

    validateUUID(uuid) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }
}

module.exports = new TransactionService();