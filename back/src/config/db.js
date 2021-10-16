
const DB = require('./config');
var Sequelize = require('sequelize');
const mysql = new Sequelize(DB.name, DB.user, DB.password, {
   host: DB.host,
   dialect: 'mysql', 
   port: DB.port,
   logging: false // para no mostrar por consola las sentencias SQL ejecutadas.
});

const db = {mysql: null,Sequelize: null};
db.mysql = mysql;
db.Sequelize = Sequelize;

module.exports = db;