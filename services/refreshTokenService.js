const refreshTokenRepository = require('../repository/RefreshTokenRepository');
const jwt = require('jsonwebtoken');
const ExpressError = require('../utils/ExpressError');

class RefreshTokenService {
    async createRefreshToken(user){
        try {
            const expirationInSeconds = this.convertToSeconds(process.env.JWT_REFRESH_TOKEN_EXPIRED);
       
            let expiredAt = new Date();
            console.log(expirationInSeconds);
            expiredAt.setSeconds(expiredAt.getSeconds() + expirationInSeconds);
            let _token = jwt.sign({ user }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED });

            let refreshToken ={
            token: _token,
            user_id: user.id,
            expiresIn: expiredAt,
            };
            await refreshTokenRepository.create(refreshToken);
            return _token;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRefreshToken(token){
        const tokenData = await refreshTokenRepository.findByToken(token);
        if (!tokenData) {
            throw new ExpressError('Token not found', 404);
        }
        if (this.verifyExpiration(tokenData)) {
            await refreshTokenRepository.delete(tokenData);
            throw new ExpressError('Token expired', 401);
        }
        return tokenData.token;


    }

    verifyExpiration = (token) => {
        return token.expiresIn.getTime() < new Date().getTime();
    };

    convertToSeconds(expiration) {
        const match = expiration.match(/^(\d+)([dhms])$/);
        if (!match) {
            throw new ExpressError('Invalid expiration format', 400);
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        switch (unit) {
            case 'd':
                return value * 24 * 60 * 60;
            case 'h':
                return value * 60 * 60;
            case 'm':
                return value * 60;
            case 's':
                return value;
            default:
                throw new Error('Invalid expiration unit');
        }
    }
}
module.exports = new RefreshTokenService();
