const {Product} = require('../models');
const validator = require('fastest-validator');
const v = new validator();
const {Op} = require('sequelize');

module.exports.getProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const products = await Product.findAll();
    const total = products.length;
    const result = {
        data: products.slice(startIndex, startIndex + limit),
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit),
    }

    res.json({
        status: 'success',
        data: result
    });
}

module.exports.getProduct = async (req, res, next) => {
    const {id} = req.params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!id || !uuidRegex.test(id)) {
        return res.status(400).json({
            status: 'error',
            message: 'ID is required'
        });
    }
    

    const product = await Product.findOne({
        where: {
            id: id
        }
    });

    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    return res.json({
        status: 'success',
        data: product
    });
}

module.exports.getProductsBy = async (req, res, next) => {
    const {name, category} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;



    const whereClause = {};
    if (name) {
        whereClause.name = { [Op.iLike]: `%${name}%` };
    }
    if (category) {
        whereClause.category = { [Op.iLike]: `%${category}%` };
    }

    const products = await Product.findAll({
        where: whereClause,
        
    });
    if (!products.length) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }
    const total = products.length;
    const newProduct = await products.slice(startIndex, startIndex + limit);
    const result = {
        data: newProduct,
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit),
    }

    return res.json({
        status: 'success',
        data: result
    });
}



module.exports.addProduct = async (req, res, next) => {

    const schema = {
        name: 'string|empty:false',
        price: 'number|empty:false|default:0|min:1',
        stock: 'number|default:0',
        description: 'string|default:No description',
        category: 'string|default:Uncategorized'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const {name, price, stock, description, category} = req.body;

    const product = await Product.create({
        name: name,
        price: price,
        stock: stock,
        description: description,
        category: category
    });

    return res.json({
        status: 'success',
        data: product
    })

}

module.exports.updateProduct = async (req, res, next) => {
    const {id} = req.params;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!id || !uuidRegex.test(id)) {
        return res.status(400).json({
            status: 'error',
            message: 'ID is required'
        });
    }
    const schema = {
        name: 'string|optional',
        price: 'number|min:1|optional',
        stock: 'number|min:0|optional',
        description: 'string|optional',
        category: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const product = await Product.findOne({
        where: {
            id: id
        }
    })

    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    await product.update(req.body);

    return res.json({
        status: 'success',
        data: product
    });
}

module.exports.deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!id || !uuidRegex.test(id)) {
        return res.status(400).json({
            status: 'error',
            message: 'ID is required'
        });
    }
    const product = await Product.findOne({
        where: {
            id: id
        }
    })
    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    product.destroy();
    return res.json({
        status: 'success',
        message: 'product deleted'
      })

}

