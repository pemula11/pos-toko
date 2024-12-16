const express = require('express');
const router = express.Router();
const {User, sequelize} = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll();
    res.json(users);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
  finally {
     
  }
});

module.exports = router;
