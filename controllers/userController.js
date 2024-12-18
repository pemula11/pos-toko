
const userService = require('../services/userService');

const validator = require('fastest-validator');
const v = new validator();
const jwt = require('jsonwebtoken');

const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env



module.exports.getUsers = async function(req, res, next) {
    try {
      const users = await User.findAll();
      if (!users) {
        return res.status(404).json({message: 'Users not found'});
      }
      res.json(users);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({message: 'Server Error'});
    }
    finally {
       
    }
  }

module.exports.login = async (req, res, next) => {
  const schema = {
    email: 'email|empty:false',
    password: 'string|min:6'
  }

  const check = v.validate(req.body, schema);

  if (check.length) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: check
    });
  }

  const {email, password} = req.body;
  
    
    // token
  const userData = await userService.login(email, password);

  return res.json({
    status: 'success',
    data: {
      ...userData
    }
  });
  
  
}