var express = require('express');
var router = express.Router();
const warpAsync = require('../utils/wrapAsync');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', warpAsync(userController.getUsers));

router.post('/login', warpAsync(userController.login));
router.post('/register', warpAsync(userController.register));

module.exports = router;
