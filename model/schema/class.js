var mongoose = require('mongoose')
var Schema = mongoose.Schema

var classSchema = new Schema({
  name: String,
  institution: String,
  passingScore: Number,
  additionScore: Number,
  password: String,
  students: Array,
  numberOfStudentsPerGroup: Number
})

module.exports = mongoose.model('Class', classSchema)
