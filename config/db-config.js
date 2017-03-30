module.exports = (env) => {
  var mongoose = require('mongoose')

  var databaseUri = 'mongodb://heroku_z9l4c0x1:gan4pt3hnlr6kblgjg7l3qn7o8@ds135700.mlab.com:35700/heroku_z9l4c0x1'
  
  // env.MONGODB_URI || 'mongodb://'
  //   + env.database.host + ':'
  //   + env.database.port + '/'
  //   + env.database.name

  mongoose.connect(databaseUri, function (err, res) {
    if (err) {
      console.log('ERROR carai connecting to: ' + databaseUri + '. ' + err);
    } else {
      console.log('top Succeeded connected to: ' + databaseUri);
    }
  })

  var db = mongoose.connection

  db.on('open', () => {
    console.log('Conected in ' + databaseUri)
  })
}