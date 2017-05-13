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
          console.log("saved exam: ", exam)
          resolve(true)
        } else {
          if (err.code === 11000) {
            console.log('error saving exam: duplicated exam')
            response.status(200).send({code: err.code, message: 'exam already exists'})
            resolve(err)
          } else {
            console.log('error saving exam: ', err.message)
            reject(err)
          }
        }
      })
    })
  },

  findExamsFromUserClass: (request, response) => {
    return new Promise((resolve, reject) => {
      var email = request.query.email || request.body.email
      var userClassName = request.query.userClassName || request.body.userClassName
      console.log(email)

      Exam.find({
        classOwnerEmail: email,
        userClassName: userClassName
      }, { _id: 0, __v: 0 },
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
