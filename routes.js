var jwt = require('express-jwt')
var env = require('./config/env')
var user = require('./controller/user')
var userClass = require('./controller/class')
var exam = require('./controller/exam')

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

  // user
  insecureRouter.post('/user/register', user.register)
  insecureRouter.post('/user/login', user.authenticate)
  insecureRouter.get('/user/test', user.test)
  insecureRouter.get('/user/register/test', user.registerTest)

  // class
  insecureRouter.post('/class/register', userClass.register)  
  insecureRouter.get('/class/user/find', userClass.findClassesFromUser)

  // exam
  insecureRouter.post('/exam/register', exam.register)
  insecureRouter.get('/exam/class/user/find', exam.findExamsFromUserClass)
}
