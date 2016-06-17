var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cvSchema = new Schema({
  employee: {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, index: { unique: true }},
    age: {type: Number, min: 18, max: 65}
  }
});

module.exports = mongoose.model('CV', cvSchema);
