var expect = require("chai").expect
var User = require('../model/schema/user')
var userController = require('../controller/user.js')
var sinon = require('sinon')
var testHelper = require('./test-helper')

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}

describe('Test suite for Users', () => {

  testHelper.setupTest()

  describe('User', () => {
    describe('when registered', () => {

      it('should successfully register user', (done) => {
        var query = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          facebook: false,
          salt: '123'
        }

        var savedUser = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          isFromFacebook: false,
          salt: '123'
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withExactArgs({ code: '200', message: 'user sucessfully registered', user: savedUser })

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

