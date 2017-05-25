var expect = require("chai").expect
var Exam = require('../model/schema/exam')
var examController = require('../controller/exam.js')
var sinon = require('sinon')
var testHelper = require('./test-helper')

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}

describe('Test suite for Exams', () => {

  testHelper.setupTest()

  describe('Exam', () => {
      describe('when registered', () => {
        it('should successfully register exam', (done) => {
          var query = {
            name: 'testExam',
            userClassName: 'test',
            classOwnerEmail: 'test@test.com'
          }

          var savedExam = {
            name: 'testExam',
            userClassName: 'test',
            classOwnerEmail: 'test@test.com'
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({code: '200', message: 'exam sucessfully registered'})

          examController.register({ query: query }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })
        })

        it('should successfully if exam already exists', (done) => {
          var query = {
            name: 'testExam',
            userClassName: 'test',
            classOwnerEmail: 'test@test.com'
          }

          var savedExam = {
            name: 'testExam',
            userClassName: 'test',
            classOwnerEmail: 'test@test.com'
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withArgs({ code: 11000, message: 'exam already exists'})

          examController.register({ query: query }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })

        })
      })

      describe('when found class', () => {
        it('should successfully find exams from user class', (done) => {
          var query = {
            email: 'test@test.com',
            userClassName: 'test'
          }
          
          var foundExam = [{ 
            name: 'testExam',
            userClassName: 'test',
            classOwnerEmail: 'test@test.com',
            secondGrades: [],
            firstGrades: [] 
          }]

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          // mock.expects('send').once().withExactArgs([{ 
          //   name: 'testExam',
          //   userClassName: 'test',
          //   classOwnerEmail: 'test@test.com',
          //   secondGrades: [],
          //   firstGrades: []
          // }])

          examController.findExamsFromUserClass({ query: query }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })

        })
      })

      describe('when saved grades', () => {
        it('should successfully save first grade', (done) => {
          var body = {
            name: 'testExam',
            userClassName: 'test',
            email: 'test@test.com',
            firstGrades: [
              {
                email: 'aluno1@email.com',
                grade: 5
              },
              {
                email: 'aluno2@email.com',
                grade: 2
              }
            ] 
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})

          examController.saveFirstGrades({ body: body }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })
        }),

        it('should successfully save second grade', (done) => {
          var body = {
            name: 'testExam',
            userClassName: 'test',
            email: 'test@test.com',
            secondGrades: [
              {
                email: 'aluno1@email.com',
                grade: 10
              },
              {
                email: 'aluno2@email.com',
                grade: 9
              }
            ] 
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})

          examController.saveSecondGrades({ body: body }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })
        })

      })
  })
})
