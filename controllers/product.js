const {Product} = require('../models');
const validator = require('fastest-validator');
const v = new validator();


module.exports.getProducts = async (req, res, next) => {

    const products = await Product.findAll();
    res.json({
        status: 'success',
        data: products
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
    return res.json({
        status: 'success',
        data: product
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

