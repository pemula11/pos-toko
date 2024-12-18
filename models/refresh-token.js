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

   
    return RefreshToken;
}


