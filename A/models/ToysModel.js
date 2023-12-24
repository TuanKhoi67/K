var mongoose = require('mongoose');
var ToySchema = mongoose.Schema({
   name: String,
   type: String,
   image: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : toys (many) - brands (one)

var ToysModel = mongoose.model('toys', ToySchema); // 'toys' : collection
module.exports = ToysModel;