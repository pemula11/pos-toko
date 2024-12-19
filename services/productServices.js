const ProductRepository = require('../repository/ProductRepository');
const ExpressError = require('../utils/ExpressError');


class ProductService {
    
    validateUUID(uuid) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }

    async findAllData(limit, offset) {
        try {
            return await ProductRepository.findAllData(limit, offset);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id){
        
        if (!this.validateUUID(id)) {
            throw new ExpressError('Invalid ID', 400);
        }
        return await ProductRepository.findOne(id);
        
    }

    async findBy(limit, offset, name, category) {
        return await ProductRepository.findBy(limit, offset, name, category);
    }

    async create(product) {
        return await ProductRepository.create(product);
    }
    async update(productId, newProduct) {
    
        if (!this.validateUUID(productId)) {
            throw new ExpressError('Invalid ID', 400);
        }
        const product = await this.findOne(productId);
        if (!product) {
            throw new ExpressError('Product not found', 404);
        }
        return await ProductRepository.update(product, newProduct);
    }

    async updateDirect(product, data){
        return await ProductRepository.update(product, data);
    }

    async delete(id){

        if (!this.validateUUID(id)) {
            throw new ExpressError('Invalid ID', 400);
        }
        const product = await this.findOne(id);
        if (!product) {
            throw new ExpressError('Product not found', 404);
        }
        return await ProductRepository.delete(product);

    }

    async countData(){
        return await ProductRepository.countData();
    }

}

module.exports = new ProductService();