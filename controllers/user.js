
const {User, RefreshToken} = require('../models');
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
  try {
    const user = await User.scope('withPassword').findOne({where: {email}});
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }
    
    const isValidPassword = await user.validPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({message: 'Invalid email or password'});
    }
    // token
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});

    const refreshToken = await RefreshToken.createToken(user);
    return res.json({
      status: 'success',
      data: {
        user,
        token,
        refreshToken
      }
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'});
  }
}