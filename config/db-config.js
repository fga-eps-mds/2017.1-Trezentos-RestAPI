module.exports = (env) => {
  var mongoose = require('mongoose')

 var databaseUri = env.MONGODB_URI

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
