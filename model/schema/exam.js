var mongoose = require('mongoose')
var Schema = mongoose.Schema

var examSchema = {
  name: String,
  userClassName: String,
  classOwnerEmail: String,
  firstGrades: Array,
  secondGrades: Array
}

exameSchema.index({
  name: 1,
  userClassName: 1,
  classOwnerEmail: 1
}, {unique: true})

module.exports = mongoose.model('Exam', examSchema)

