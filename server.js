var express = require('express')
var app = express()
var env = require('./config/env')
var dbConfig = require('./config/db-config')(env)
var bodyParser = require('body-parser')

require('./routes')(app, express)

app.use(bodyParser.json({limit: '5mb'}));

app.listen(env.port, () => {
  console.log('Listening on ' + env.port)
})