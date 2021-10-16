'use strict'
const db = require('../config/db');
const Role = require('./role');

var mysql = db.mysql;
var Sequelize = db.Sequelize;


class User extends Sequelize.Model {}

User.init(
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
    mail: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    id_rol: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: Role,
        key: 'id'
      }
    },

  },
  {
    sequelize: mysql,
    tableName: 'user',
    timestamps: false
  }
);

module.exports =  User;