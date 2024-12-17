const express = require('express');
const router = express.Router();
const {User, sequelize} = require('../models');
const warpAsync = require('../utils/wrapAsync');

const userController = require('../controllers/user');


/* GET home page. */
router.get('/', warpAsync(userController.getUsers));




module.exports = router;
