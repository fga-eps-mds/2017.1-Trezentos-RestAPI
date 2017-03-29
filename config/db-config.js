module.exports = (env) => {
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://'
    + env.database.host + ':'
    + env.database.port + '/'
    + env.database.name)

  var db = mongoose.connection

  db.on('open', () => {
    console.log('Conected in mongodb://'
      + env.database.host + ':'
      + env.database.port + '/'
      + env.database.name)
  })
}