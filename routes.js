var jwt = require('express-jwt')
var env = require('./config/env')
var user = require('./controller/user')

var jwtCheck = jwt({
  secret: env.secret
})

module.exports = (app, express) => {
  const secureRouter = express.Router() // secure routes
  const insecureRouter = express.Router() // insecure routers
 
  // secure routes
  //app.use('/api/secure', secureRouter)
  //secureRouter.use('/', jwtCheck)

  // insecure routes
  app.use('/api', insecureRouter)
  insecureRouter.post('/user/register', user.register)
  insecureRouter.post('/user/login', user.authenticate)
}
