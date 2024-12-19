'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    validPassword(password) {
      return  bcrypt.compareSync(password, this.password);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
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
    // hooks: {
    //   beforeCreate: async (user) => {
    //     if (typeof user.password !== "string" || user.password.length < 8) {
    //       throw new Error("Password must be at least 8 characters long");
    //     }
    //     user.password = await bcrypt.hash(user.password, 10);

    //   }
    // },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
        withPassword: {
            attributes: {},
        }
    },
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};