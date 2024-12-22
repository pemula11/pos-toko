const { where } = require('sequelize');
const refreshTokenService = require('../services/refreshTokenService');
const userService = require('../services/userService');
const Validator = require('fastest-validator');
const { token } = require('morgan');
const v = new Validator();


module.exports.createRefreshToken = async (req, res, next) => {
    const user_id = req.body.user_id;

    schema = {
        user_id: 'string|empty:false',
      //  refresh_tokens: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    try {
        const user = userService.findById(user_id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const refreshToken = await refreshTokenService.createRefreshToken(user_id);
        return res.json({
            status: 'success',
            data: refreshToken
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Server Error'
        });
    }
}


module.exports.getToken = async (req, res, next) => {
    if (!req.body.refresh_token) {
        return res.status(400).json({
            status: 'error',
            message: 'Refresh token is required'
        });
    }
    const refreshToken = req.body.refresh_token;

    try {
        const token = refreshTokenService.getRefreshToken(refreshToken);

        if (!token) {
            return res.status(404).json({
                status: 'error',
                message: 'Token not found'
            });
        }
        return res.json({
            status: 'success',
            data: token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Server Error ' + error
        });
    }

    
}

module.exports.refreshToken = async (req, res, next) => {
    const schema = {
        refresh_token: 'string|empty:false',
        email: 'string|empty:false',
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    const {email, refresh_token} = req.body;

   
    const token = await refreshTokenService.getRefreshToken(refresh_token);
    

    if (!token) {
        return res.status(404).json({
            status: 'error',
            message: 'Token not found'
        });
    }
    const newToken = await refreshTokenService.refreshToken(email, token);
    return res.json({
        status: 'success',
        data: newToken
    });
   
}

