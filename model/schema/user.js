var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema ({
  name: String,
  email: { type: String, required: true, unique: false }
})

module.exports = mongoose.model('User', userSchema)
