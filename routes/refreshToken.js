var express = require('express');
var router = express.Router();
const warpAsync = require('../utils/wrapAsync');
const refresController = require('../controllers/refreshTokenController');

/* GET users listing. */


router.post('/', warpAsync(refresController.refreshToken));

module.exports = router;
