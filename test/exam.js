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
  })
})
