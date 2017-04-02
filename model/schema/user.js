var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema ({
  name: String,
  email: { type: String, required: true, unique: false },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)
