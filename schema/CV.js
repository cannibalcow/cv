var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
  title: {type: String, required: true},
  items: {type: Array}
});

var previousAssignment = new Schema({
  title: {type: String, required: true},
  startYear: {type: String},
  endYear: {type: String},
  role: {type: String},
  description: {type: String},
  technology: [String]
});

var cvSchema = new Schema({
  employee: {
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, index: { unique: true }},
    age: {type: Number, min: 18, max: 65},
    phone: {type: String},
    image: {type: String}
  },
  description: {
    tagline: { type: String },
    text: { type: String }
  },
  properties: [propertySchema],
  previousAssignments: [previousAssignment]
});

module.exports = mongoose.model('CV', cvSchema);
