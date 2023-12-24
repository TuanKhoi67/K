var express = require('express');
var router = express.Router();
var BrandModels = require('../models/BrandModels');
var ToysModel = require('../models/ToysModel');

router.get('/', async (req, res) => {
   var brands = await BrandModels.find({});
   res.render('brand/index', { brands });
})

router.get('/add', (req, res) => {
   res.render('brand/add');
})

router.post('/add', async (req, res) => {
   var brand = req.body;
   await BrandModels.create(brand);
   res.redirect('/brand');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   //SQL: SELECT * FROM toys WHERE brand = "id"
   var toys = await ToysModel.find({ brand : id }).populate('brand');
   res.render('brand/detail', { toys })
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   //cách 1
   // try {
   //    //SQL: DELETE FROM brands WHERE brand = id
   //    await BrandModels.findByIdAndDelete(id);
   //    console.log('Delete brand succeed !');
   // } catch (err) {
   //    console.log('Delete brand fail. Error: ' + err);
   // };

   //cách 2
   var brand = await BrandModels.findById(id);
   await BrandModels.deleteOne(brand);

   res.redirect('/brand');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await BrandModels.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/brand');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = await BrandModels.findById(id);
   res.render('brand/edit', { brand });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await BrandModels.findByIdAndUpdate(id, brand);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/brand');
})

module.exports = router;