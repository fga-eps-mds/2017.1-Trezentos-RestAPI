module.exports = (env) => {
  var mongoose = require('mongoose')
  mongoose.connect('mongodb://heroku_dh63xpgs:heroku_dh63xpgs@ds145790.mlab.com:45790/heroku_dh63xpgs')

  var db = mongoose.connection

  db.on('open', () => {
    console.log('Conected in mongodb://heroku_dh63xpgs:heroku_dh63xpgs@ds145790.mlab.com:45790/heroku_dh63xpgs')
  })
}