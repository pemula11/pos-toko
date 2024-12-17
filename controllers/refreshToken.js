const { where } = require('sequelize');
const {User, RefreshToken} = require('../models');
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
        const user = await User.findOne({
            where: {
                id: user_id
            }
        });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        const refreshToken = await RefreshToken.createToken(user);
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
        const token = await RefreshToken.findOne({
            where: {
                token: refreshToken
            }
        });

        if (!token) {
            return res.status(404).json({
                status: 'error',
                message: 'Token not found'
            });
        }

        if (RefreshToken.verifyExpiration(token)){
            RefreshToken.destroy({
                where: {
                    id: token.id
                }
            });
            return res.status(400).json({
                status: 'error',
                message: 'Token has expired, Please login again'
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
            message: 'Server Error'
        });
    }
}
