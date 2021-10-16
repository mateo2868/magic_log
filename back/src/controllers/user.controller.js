const express = require('express');
const router = express.Router();
const db = require('../config/db');
var mysql = db.mysql;
const UserModel = require('../models/user');
const RolModel = require('../models/role');

const { body, validationResult } = require('express-validator');

router.get('/getAll',async (req,res) => {
  try {
    var user = await UserModel.findAll();
    return res.status(200).json({
      status: 200,
      message: 'Sucessful request',
      body: {
        user
      }
    });
  } catch (error) {
    return res.status(200).json({
      status: 500,
      message: 'Error tryging to query database',
      body: null
    });
  }
});

router.post('/create',
  body('name').isString().not().isEmpty(),
  body('mail').custom(mail => { return UserModel.findOne({where: {mail}}).then(user => { if (user) return Promise.reject('E-mail already in use') }); }),
  body('password').isString(),
  body('id_rol').isNumeric().custom(rol => { return RolModel.findOne({where: {id: rol}}).then(rol => { if (!rol) return Promise.reject('El rol no existe') }); }),
  async (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  

    var transaction = await mysql.transaction();
    let body = req.body;

    try {
      var params = {
        name: body.name,
        mail: body.mail,
        password: body.password,
        id_rol: body.id_rol
      };
      var user = await UserModel.create(params);
      await transaction.commit();
      return res.status(200).json({
        status: 200,
        message: `User created`,
        body: {
            user
        }
      });
    } catch (error) {
      await transaction.rollback();
      var status = ['SequelizeUniqueConstraintError', 'ForeignKeyConstraint'].some(e=>error.name.includes(e))? 409 : 500;
      return res.status(200).json({
        status,
        message: error.message,
        body: null
      });
    }
});

module.exports = router;
