'use strict'
const db = require('../config/db');

var mysql = db.mysql;
var Sequelize = db.Sequelize;


class Role extends Sequelize.Model {}

Role.init(
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
  },
  {
    sequelize: mysql,
    tableName: 'role',
    timestamps: false
  }
);

module.exports =  Role;