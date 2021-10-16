'use strict'
const {db} = require('../config/db');
const User = require('./user');

var mysql = db.mysql;
var Sequelize = db.Sequelize;


class Product extends Sequelize.Model {}

Product.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      
    },
    id_user: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: User,
        key: 'id'
      }
    }

  },
  {
    sequelize: mysql,
    tableName: 'product',
    timestamps: false
  }
);

module.exports =  Product;