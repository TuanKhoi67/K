var express = require('express');
var router = express.Router();
var ToysModel = require('../models/ToysModel');
var BrandModels = require('../models/BrandModels');

/* GET users listing. */
router.get('/', async(req, res) => {
  var ToysModel = await ToysModel.find({}).populate('brand');
  res.render('toy/index', { toys });
})
module.exports = router;
