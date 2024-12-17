const express = require('express');
const router = express.Router();
const {Product} = require('../models');
const warpAsync = require('../utils/wrapAsync');
const productController = require('../controllers/product');

router.get('/', warpAsync(productController.getProducts));
router.get('/:id', warpAsync(productController.getProduct));
router.post('/', warpAsync(productController.addProduct));

module.exports = router;