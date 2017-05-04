var Class = require('../model/schema/class')

module.exports = {
  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var userClass = new Class({
        name: request.query.name || request.body.name,
        ownerEmail: request.query.ownerEmail || request.body.ownerEmail,
        institution: request.query.institution || request.body.institution,
        passingScore: request.query.passingScore || request.body.passingScore,
        additionScore: request.query.additionScore || request.body.additionScore,
        password: request.query.password || request.body.password,
        students: request.query.students || request.body.password,
        numberOfStudentsPerGroup: request.query.numberOfStudentsPerGroup || request.body.numberOfStudentsPerGroup
      })
      userClass.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'class sucessfully registered'})
          console.log("saved user class: ", user)
          resolve(true)
        } else {
          if (err.code === 11000) {
            console.log('error saving user class: duplicated class')
            response.status(200).send({code: err.code, message: 'class already exists'})
            resolve(err)
          } else {
            console.log('error saving class: ', err.message)
            reject(err)
          }
        }
      })
    })
  },

  findClassesFromUser: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email || request.body.email
      console.log(email)

      Class.find({ ownerEmail: email },
        { _id: 0, __v: 0 },
        (err, results) => {
          if(!err) {
            response.status(200).send(results)
            resolve(response)
          } else {
            console.log(err)
            reject(err)
          }
        })
    })
  },

  update: (request, response) => {
    return new Promise((resolve, reject) => {
      var userClassJson = request.query.userClass

      var userClass = JSON.parse(userClassJson)

      var oldName = request.query.oldName || request.body.oldName
      var ownerEmail = request.query.email || request.body.email
      Class.update({ ownerEmail: ownerEmail, name: oldName },
        {$set: userClass}, (err, mongoResponse) => {
        if (!err) {
          var status = err == null && mongoResponse.nModified === 1
          response.status(200).send({ result: status })
          resolve(status)
        } else {
          reject(err)
        }
      })
    })
  },
}
