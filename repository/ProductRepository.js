const {Product} = require('../models');
const {Op} = require('sequelize');

class ProductRepository {
    async findAllData(){
        try {
            return await Product.findAll();
        } catch (error) {
            console.error("Failed to fetch products: ", error);
            throw new Error("Failed to fetch products: ", error);
        }
    }

    async findOne(id){
       try {
            return  await Product.findOne({
                where: {
                    id: id
                }
            });
       } catch (error) {
              throw new Error("Failed to fetch product: ", error);
       }
    }

    async findBy(name = '', category = ''){
        try {
            const whereClause = {};
            if (name !== '') {
                    whereClause.name = { [Op.iLike]: `%${name}%` };
            }
            if (category !== '') {
                whereClause.category = { [Op.iLike]: `%${category}%` };
            }
            
            return await Product.findAll({
                 where: whereClause,
            });
        }
        catch (error) {
            console.error("Failed to fetch product: ", error);
            throw new Error("Failed to fetch product: ", error);
        }
    }

    async create(product){
        try {
            return await Product.create(product);
        } catch (error) {
            throw new Error("Failed to create product: ", error);
        }
    }
    
    async update(product, newProduct){
        try {
            return await product.update(newProduct);
        } catch (error) {
            throw new Error("Failed to update product: ", error);
            
        }
    }

    async delete(product){
        try {
            return await product.destroy();
        } catch (error) {
          //  console.error("Failed to delete product: ", error);
            throw new Error("Failed to delete product: ", error);
        }
    }

}

module.exports = new ProductRepository();