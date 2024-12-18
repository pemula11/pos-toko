const {RefreshToken} = require('../models');

class RefreshTokenRepository {
    async create(token){
        try {
            return await RefreshToken.create(token);
        }
        catch (error){
            console.error("Failed to create refresh token. Error: ", error);
            throw new Error("Failed to create refresh token");
        }
    }

    async findByToken(token){
        try {
            return await RefreshToken.findOne({
                where: {
                    token: token
                }
            });
        }
        catch (error) {
            console.error("Failed to fetch refresh token. Error: ", error);
            throw new Error("Failed to fetch refresh token");
        }
    }

    async delete(token) {
        try {
            RefreshToken.destroy({
                where: {
                    id: token.id
                }
            });
        } catch (error) {
            onsole.error("Failed to Delete refresh token. Error: ", error);
            throw new Error("Failed to Delete refresh token");
        }
    }
}

module.exports = new RefreshTokenRepository();