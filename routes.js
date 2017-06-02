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
  insecureRouter.get('/user/rate', user.findUserRateInExam)
  insecureRouter.post('/user/rate', user.saveRates)
  insecureRouter.get('/user/rateToDo', user.findUserRatesToDo)
  insecureRouter.post('/user/rateToDo', user.saveRatesToDo)
  insecureRouter.delete('/user/rateToDo', user.deleteRatesToDo)

  // class
  insecureRouter.post('/class/register', userClass.register)
  insecureRouter.get('/class/find', userClass.findClasses)
  insecureRouter.get('/class/user/find', userClass.findClassesFromUser)
  insecureRouter.put('/class/user/student', userClass.insertUserInClass)
  insecureRouter.put('/class/user/edit', userClass.update)

  // exam
  insecureRouter.post('/exam/register', exam.register)
  insecureRouter.get('/exam/class/user/find', exam.findExamsFromUserClass)
  insecureRouter.get('/exam/first_grades', exam.findFirstGradeFromExam)

  //grades
  insecureRouter.put('/exam/first_grades', exam.saveFirstGrades)
  insecureRouter.put('/exam/second_grades', exam.saveSecondGrades)
}
