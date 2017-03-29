var User = require('../model/schema/user')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = request.user
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'user sucessfully registered'})
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

  authenticate: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = request.user
      user.findOne({
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
  }
}
