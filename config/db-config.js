module.exports = (env) => {
  var mongoose = require('mongoose')

  var databaseUri = env.MONGODB_URI || 'mongodb://heroku_khpq2sl3:fd8p7chlmrht8o39ghake8dumv@ds147520.mlab.com:47520/heroku_khpq2sl3'

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
