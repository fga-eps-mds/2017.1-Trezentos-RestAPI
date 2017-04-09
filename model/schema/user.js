var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema ({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String }
})

module.exports = mongoose.model('User', userSchema)
