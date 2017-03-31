var express = require('express')
var app = express()
var env = require('./config/env')
var dbConfig = require('./config/db-config')(env)
var bodyParser = require('body-parser')

require('./routes')(app, express)

app.use(bodyParser.json({limit: '5mb'}));

var port = env.port || 5000

app.listen(port, () => {
  console.log('Listening on ' + port)
})
