var mongoose = require('mongoose')
var Schema = mongoose.Schema

var classSchema = new Schema({
  // identifier: {
  name: String,
  ownerEmail: String,
  // },
  institution: String,
  passingScore: Number,
  additionScore: Number,
  password: String,
  students: Array,
  numberOfStudentsPerGroup: Number
})

classSchema.index({name: 1, ownerEmail: 1}, {unique: true})

module.exports = mongoose.model('Class', classSchema)
