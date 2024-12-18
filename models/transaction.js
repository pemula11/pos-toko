'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
        Transaction.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'user'
        });

        Transaction.hasMany(models.TransactionDetail, {
            as: 'transactionDetails',
        });

    }
  }
  Transaction.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    transactionDate: {
        allowNull: false,
        field: 'transaction_date',
        type: DataTypes.DATE
      },
    createdBy: {
      type: DataTypes.UUID,
      field: 'created_by',
      allowNull: false
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        field: 'total_amount',
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    paranoid: true,
    deletedAt: 'deleted_at',
    tableName: 'transactions',
    modelName: 'Transaction',
  });
  return Transaction;
};