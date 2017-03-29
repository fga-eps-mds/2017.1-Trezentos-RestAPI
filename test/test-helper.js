var chai = require('chai')
var env = require("../config/test.env")
var async = require('async')
var mongoSeed = require('mongo-seed')
var path = require('path')
var mongoose = require('mongoose')

mongoose.Promise = Promise // Prevents mongoose deprecated promise API warning
const mongoUrl = 'mongodb://' + env.database.host + ':' + env.database.port + '/' + env.database.name

module.exports = {

  setupTest (seedName) {

    before(done => {
      async.waterfall([
        callback => {
          mongoose.connect(mongoUrl)
          mongoose.connection.on('error', done)
          mongoose.connection.once('open', callback)
        },
        callback => {
          var db = mongoose.connection
          async.forEachOf(db.collections, (collection, collectionName, done) => {
            collection.remove({}, done)
          }, callback)
        },
        callback => {
          seedName = seedName || '../seeds/base/db-seed.js'
          var seedPath = path.resolve(__dirname + '/' + seedName)
          mongoSeed.load(env.database.host, env.database.port, env.database.name, seedPath, "function", callback)
        },
      ], function (err, results) {
        if (err) {
          throw err
        }
        done()
      })
    })

    after(done => {
      mongoose.disconnect().then(() => {
        done()
      })
    })
  }
}
