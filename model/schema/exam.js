var mongoose = require('mongoose')
var Schema = mongoose.Schema

var examSchema = new Schema({
  name: String,
  userClassName: String,
  classOwnerEmail: String,
  firstGrades: String,
  secondGrades: String
})

examSchema.index({
  name: 1,
  userClassName: 1,
  classOwnerEmail: 1
}, {unique: true})

module.exports = mongoose.model('Exam', examSchema)
