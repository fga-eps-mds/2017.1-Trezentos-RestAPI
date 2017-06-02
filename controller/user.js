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
        if (!err) {
          user = _.omit(user.toObject(), ['_id', '__v'])
          response.status(200).send({
            code: '200',
            message: 'user sucessfully registered',
            user: user
          })
          resolve(true)
        } else {
          if (err.code === 11000) {
            // console.log('error saving user: duplicated user')
            response.status(200).send({code: err.code, message: 'user already exists'})
            resolve(err)
          } else {
            // console.log('error saving user: ', err.message)
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

        // console.log(success)
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
          response.status(400).send({
            success: false,
            name: null,
            password: null,
            salt: null
          })
          reject(err)
        } else {
          response.status(400).send({
            success: false,
            name: null,
            password: null,
            salt: null
          })
          reject()
        }
      })
    })
  }, 

  saveRates: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.body.email
      var rate = request.body.rate

      User.update({
        email: email
      }, { $push: { rates: rate } },
      (err, mongoResponse) => {
        if(!err) {
          var status = err == null && mongoResponse.nModified === 1
          response.status(200).send({ result: status })
          resolve(status)
        } else {
          //  console.log(err)
          reject(err)
        }
      })
    })
  },

  findUserRateInExam: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email
      var userClass = request.query.userClass
      var exam = request.query.exam
      var userClassOwnerEmail = request.query.userClassOwnerEmail

      var rateToFind = {
        userClass: userClass,
        exam: exam,
        email: userClassOwnerEmail
      }
      User.find({
        email: email,
      }, { _id: 0, __v: 0 },
        (err, results) => {
          var user = results[0]
          if(!err) {
            response.status(200).send(user.rates.filter((rate) => {
              return rate.userClass === rateToFind.userClass &&
                rate.exam === rateToFind.exam &&
                rate.email === rateToFind.email
            }))
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  },

  saveRatesToDo: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.body.email
      var rate = request.body.rateToDo

      User.update({
        email: email
      }, { $push: { ratesToDo: rate } },
      (err, mongoResponse) => {
        if(!err) {
          var status = err == null && mongoResponse.nModified === 1
          response.status(200).send({ result: status })
          resolve(status)
        } else {
          //  console.log(err)
          reject(err)
        }
      })
    })
  },

  findUserRatesToDo: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email

      User.find({
        email: email,
      }, { _id: 0, __v: 0 },
        (err, results) => {
          var user = results[0]
          if(!err) {
            response.status(200).send(user.ratesToDo)
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  },

  deleteRatesToDo: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email
      var rate = {
        userClass: request.query.userClass,
        exam: request.query.exam,
        email: request.query.userClassOwnerEmail
      }

      User.update({
        email: email,
      }, { $pull: { ratesToDo: rate } },
        (err, mongoResponse) => {
          if(!err) {
            var status = err == null && mongoResponse.nModified === 1
            response.status(200).send({ result: status })
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  }

}
