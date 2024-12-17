'use strict';
const {
  Model
} = require('sequelize');

const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate(models) {
            RefreshToken.belongsTo(models.User, 
                {
                    foreignKey: 'user_id',
                }
            )
        }
    }

    RefreshToken.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            field: 'user_id',
            allowNull: false,
        },
        expiresIn: {
            type: DataTypes.DATE,
            field: 'expires_in',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        }
    },{
        tableName: 'refresh_tokens',
        timestamps: true,
        sequelize,
        modelName: 'RefreshToken'
    });

    RefreshToken.createToken = async (user) => {
        const expirationInSeconds = convertToSeconds(process.env.JWT_REFRESH_TOKEN_EXPIRED);
       
        let expiredAt = new Date();
        console.log(expirationInSeconds);
        expiredAt.setSeconds(expiredAt.getSeconds() + expirationInSeconds);
        let _token = jwt.sign({ user }, process.env.JWT_SECRET_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED });

        let refreshToken = await RefreshToken.create({
          token: _token,
          user_id: user.id,
          expiresIn: expiredAt,
        });
        return refreshToken.token;
      };

      RefreshToken.verifyExpiration = (token) => {
        return token.expiresIn.getTime() < new Date().getTime();
      };
    return RefreshToken;
}

function convertToSeconds(expiration) {
    const match = expiration.match(/^(\d+)([dhms])$/);
    if (!match) {
        throw new Error('Invalid expiration format');
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