var expect = require("chai").expect
var Class = require('../model/schema/class')
var classController = require('../controller/class.js')
var sinon = require('sinon')
var testHelper = require('./test-helper')

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}

describe('Test suite for Classes', () => {

  testHelper.setupTest()

  describe('Class', () => {
    describe('when registered', () => {

      it('should successfully register class', (done) => {
        var query = {
          name: 'test class',
          email: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var savedClass = {
          name: 'test class',
          email: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withExactArgs({ code: '200', message: 'class sucessfully registered'})

        classController.register({ query: query }, response)
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

        it('should sucessfully if class already exists', (done) => {
        var query = {
          name: 'test class',
          email: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var savedClass = {
          name: 'test class',
          email: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withArgs({ code: 11000, message: 'class already exists'})

        userController.register({ query: query }, response)
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
})