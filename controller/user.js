var User = require('../model/schema/user')
var _ = require('lodash')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = new User({
        name: request.query.name,
        email: request.query.email,
        password: request.query.password,
        isFromFacebook: request.query.facebook,
        salt: request.query.salt
      })
      user.save((err, user) => {
        user = _.omit(user.toObject(), ['_id', '__v'])
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
        var success = err === null && user !== null
        
        console.log(success)
        if (success) {
          var result = {
            success: success,
            name: user.name,
            password: user.password,
            salt: user.salt
          }

          response.status(200).send(result)
          resolve(result)
        } else if(err) {
          reject(err)
        } else {
          response.status(400).send({
            success: false,
            name: null,
            password: null,
            salt: null
          })          
        }
      })
    })
  }
}
