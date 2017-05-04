var User = require('../model/schema/user')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = new User({
        name: request.query.name || request.body.name,
        email: request.query.email || request.body.email,
        password: request.query.password || request.body.password,
        isFromFacebook: request.query.facebook || request.body.facebook,
        salt: request.query.salt || request.body.salt
      })
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({
            code: '200',
            message: 'user sucessfully registered',
            user: user
          })
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
      var email = request.query.email || request.body.email
      User.findOne({
        email: email,
      }, {__v: 0, _id: 0}, (err, user) => {
        var result = {
          success: err === null && user !== null,
          name: user.name,
          password: user.password,
          salt: user.salt
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
