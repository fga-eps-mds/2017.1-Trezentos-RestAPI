var User = require('../model/schema/user')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = new User({
        name: request.query.name,
        email: request.query.email,
        password: request.query.password
      })
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'user sucessfully registered'})
          console.log("saved user: ", user)
          resolve(true)
        } else {
          if (err.code === 11000) {
            console.log('error saving user: duplicated user')
            response.status(200).send({code: err.code, message: 'user already exists'})
            resolve(err)
          } else {
            console.log('error saving user: ', err.message)
            reject(err)
          }
        }
      })
    })
  },

  authenticate: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = new User({
        email: request.query.email || request.email,
        password: request.query.password || request.password
      })
      console.log(request.query, request.body, request.user)
      User.findOne({
        email: user.email,
        password: user.password
      }, {__v: 0, _id: 0, password: 0}, (err, user) => {
        var result = {
          sucess: err === null && user !== null,
          user: user
        }

        response.status(200).send(result)
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  test: (request, response) => {
    response.send({ test: true, production: true })
  },

  registerTest: (request, response) => {
    return new Promise((resolve, reject) => {
      var user =  new User({
        name: "test",
        email: "test@test.com",
        password: "123456"
      })
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'user sucessfully registered', user: user, age: user.age })
          resolve(true)
        } else {
          if (err.code === 11000) {
            reponse.status(200).send({code: err.code, message: 'user already exists'})
            resolve(err)
          } else {
            reject(err)
          }
        }
      })
    })
  },

}
