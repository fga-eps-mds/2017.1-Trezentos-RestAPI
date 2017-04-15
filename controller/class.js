var Class = require('../model/schema/class')

module.exports = {
  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var userClass = new Class({
        name: request.query.name || request.name,
        ownerEmail: request.query.ownerEmail || request.ownerEmail,
        institution: request.query.institution || request.institution,
        passingScore: request.query.passingScore || request.passingScore,
        additionScore: request.query.additionScore || request.additionScore,
        password: request.query.password || request.password,
        students: request.query.students || request.password,
        numberOfStudentsPerGroup: request.query.numberOfStudentsPerGroup || request.numberOfStudentsPerGroup
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
      var email = request.query.email || request.email
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
  }
}
