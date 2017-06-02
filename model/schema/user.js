var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema ({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isFromFacebook: { type: Boolean, default: false },
  salt: String,
  rates: Array,
  ratesToDo: Array
})

module.exports = mongoose.model('User', userSchema)
