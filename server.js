var express = require('express')
var app = express()
var env = require('./config/env')
var dbConfig = require('./config/db-config')(env)
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '5mb'}))

require('./routes')(app, express)

var port = env.port

app.listen(port, () => {
  console.log('Listening on ' + port)
})
