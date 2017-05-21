var Class = require('../model/schema/class')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var userClass = new Class({
        name: request.query.name,
        ownerEmail: request.query.ownerEmail,
        institution: request.query.institution,
        passingScore: request.query.passingScore,
        additionScore: request.query.additionScore,
        password: request.query.password,
        students: request.query.students,
        numberOfStudentsPerGroup: request.query.numberOfStudentsPerGroup
      })
      userClass.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'class sucessfully registered'})
          // console.log("saved user class: ", user)
          resolve(true)
        } else {
          if (err.code === 11000) {
            // console.log('error saving user class: duplicated class')
            response.status(200).send({code: err.code, message: 'class already exists'})
            resolve(err)
          } else {
            // console.log('error saving class: ', err.message)
            reject(err)
          }
        }
      })
    })
  },

  findClasses: (request, response) => {
    return new Promise((resolve, reject) => {
      Class.find({} ,{ _id: 0, __v: 0 }, (err, results) => {
          if(!err) {
            response.status(200).send(results)
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  },


  findClassesFromUser: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email
      // console.log(email)

      Class.find({ ownerEmail: email },
        { _id: 0, __v: 0 },
        (err, results) => {
          if(!err) {
            response.status(200).send(results)
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  },
  
  insertUserInClass: (request, response) => {
    return new Promise((resolve, reject) => {
      // console.log(request.query)

      var student = request.query.student
      var name = request.query.name
      var email = request.query.email

      Class.update({ ownerEmail: email, name: name },
        {$push: { students: student }}, (err, mongoResponse) => {
        if (!err) {
          var status = err == null && mongoResponse.nModified === 1
          response.status(200).send({ result: status })
          resolve(status)
        } else {
          // console.log(err)
          reject(err)
        }
      })
    })
  },

  update: (request, response) => {
    return new Promise((resolve, reject) => {
      var userClassJson = request.query.userClass

      var userClass = JSON.parse(userClassJson)

      var oldName = request.query.oldName
      var ownerEmail = request.query.email

      Class.update({ ownerEmail: ownerEmail, name: oldName },
        {$set: userClass}, (err, mongoResponse) => {
        if (!err) {
          var status = err == null && mongoResponse.nModified === 1
          response.status(200).send({ result: status })
          resolve(status)
        } else {
          // console.log(err)
          reject(err)
        }
      })
    })
  }
}
