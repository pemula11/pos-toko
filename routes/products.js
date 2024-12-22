const express = require('express');
const router = express.Router();
const {Product} = require('../models');
const warpAsync = require('../utils/wrapAsync');
const productController = require('../controllers/productController');
const permission = require('../middleware/permission');


router.get('/', warpAsync(productController.getProducts));
router.get('/search', warpAsync(productController.getProductsBy));
router.get('/:id', warpAsync(productController.getProduct));
router.post('/', permission('admin'), warpAsync(productController.addProduct));
router.put('/:id', permission('admin'), warpAsync(productController.updateProduct));
router.delete('/:id', permission('admin'), warpAsync(productController.deleteProduct));

module.exports = router;