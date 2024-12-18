const UserRepository = require('../repository/UserRepository');
const refreshTokenService = require('./refreshTokenService');
const jwt = require('jsonwebtoken');
const ExpressError = require('../utils/ExpressError');

const {
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env

class UserService {

    async getUsers() {
        try {
            return await UserRepository.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, password) {
        
            const user = await UserRepository.findByEmail(email);
            
            if (!user) {
                throw new ExpressError("Mail or password not found", 404);
            }
            
            const isValidPassword = await user.validPassword(password);
            if (!isValidPassword) {
                throw new ExpressError("Mail or password not found", 404);
            }
            const dataUser = {
                user_id: user.id,
                email: user.email,
                username: user.name
            }
            const token = jwt.sign({dataUser}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED})
            const refreshToken = await refreshTokenService.createRefreshToken(user);
            return {dataUser, token, refreshToken};
        }
        

}

module.exports = new UserService();