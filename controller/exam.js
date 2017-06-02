var Exam = require('../model/schema/exam')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var exam = new Exam({
        name: request.query.name || request.body.name,
        userClassName: request.query.userClassName || request.body.userClassName,
        classOwnerEmail: request.query.classOwnerEmail || request.body.classOwnerEmail
      })
      exam.save((err, exam) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'exam sucessfully registered'})
          resolve(true)
        } else {
          if (err.code === 11000) {
            // console.log('error saving exam: duplicated exam')
            response.status(200).send({code: err.code, message: 'exam already exists'})
            resolve(err)
          } else {
            // console.log('error saving exam: ', err.message)
            reject(err)
          }
        }
      })
    })
  },

  findExamsFromUserClass: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email
      var userClassName = request.query.userClassName
      // console.log(email)

      Exam.find({
        classOwnerEmail: email,
        userClassName: userClassName
      }, { _id: 0, __v: 0 },
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

  saveFirstGrades: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.body.email
      var userClassName = request.body.userClassName
      var name = request.body.name
      var firstGrades = request.body.firstGrades

      console.log(email, userClassName, name, firstGrades)

      Exam.update({
        classOwnerEmail: email,
        userClassName: userClassName,
        name: name
      }, { $set: { firstGrades: firstGrades } },
      (err, mongoResponse) => {
         if (!err) {
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

  saveSecondGrades: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.body.email
      var userClassName = request.body.userClassName
      var name = request.body.name
      var secondGrades = request.body.secondGrades

      Exam.update({
        classOwnerEmail: email,
        userClassName: userClassName,
        name: name
      }, { $set: { secondGrades: secondGrades } },
      (err, mongoResponse) => {
         if (!err) {
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

  findFirstGradeFromExam: (request, response) => {
    return new Promise((resolve, reject) => {
      var classOwnerEmail = request.query.classOwnerEmail
      var userClassName = request.query.userClassName
      var name = request.query.name
      // console.log(email)

      Exam.find({
        classOwnerEmail: classOwnerEmail,
        userClassName: userClassName,
        name: name
      }, { _id: 0, __v: 0 },
        (err, results) => {
          if(!err) {
            response.status(200).send(results[0].firstGrades)
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  },

  saveGroups: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.body.email
      var userClassName = request.body.userClassName
      var name = request.body.name
      var groups = request.body.groups

      Exam.update({
        classOwnerEmail: email,
        userClassName: userClassName,
        name: name
      }, { $set: { groups: groups } },
      (err, mongoResponse) => {
         if (!err) {
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

  findGroups: (request, response) => {
    return new Promise((resolve, reject) => {
      var classOwnerEmail = request.query.classOwnerEmail
      var userClassName = request.query.userClassName
      var name = request.query.name
      // console.log(email)

      Exam.find({
        classOwnerEmail: classOwnerEmail,
        userClassName: userClassName,
        name: name
      }, { _id: 0, __v: 0 },
        (err, results) => {
          if(!err) {
            response.status(200).send(results[0].groups)
            resolve(response)
          } else {
            // console.log(err)
            reject(err)
          }
        })
    })
  }
}
