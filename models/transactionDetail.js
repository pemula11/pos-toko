'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
      this.Transaction = TransactionDetail.belongsTo(models.Transaction, {
            foreignKey: 'transaction_id',
            as: 'transaction',
            targetKey: 'id'
       });
       this.Product =  TransactionDetail.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product',
            targetKey: 'id'

         });
    }
  }
  TransactionDetail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    TransactionId: {
      type: DataTypes.UUID,
      field: 'transaction_id',
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'id'
      }

    },
    productId: {
        type: DataTypes.UUID,
        field: 'product_id',
        allowNull: false
      },
    price: {
        type: DataTypes.INTEGER,
        field: 'price',
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'quantity',
        allowNull: false,
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.INTEGER,
        field: 'subtotal',
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
    tableName: 'transaction_detail',
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};