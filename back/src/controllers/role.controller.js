const express = require('express');
const router = express.Router();
// import {db} from '../db';
// var mysql = db.mysql;
const RoleModel = require('../models/role');
// const { body, validationResult } = require('express-validator');

router.get('/getAll',async (req,res) => {
  try {
    var role = await RoleModel.findAll();
    return res.status(200).json({
      status: 200,
      message: 'Sucessful request',
      body: {
        role
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

module.exports = router;
