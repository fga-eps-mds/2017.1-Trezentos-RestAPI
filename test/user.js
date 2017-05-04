var expect = require("chai").expect
var User = require('../model/schema/user')
var userController = require('../controller/user.js')
var sinon = require('sinon')

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}

describe('Test suite for Users', () => {
  describe('User', () => {
    describe('when registered', () => {

      it('should successfully register user', (done) => {
        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withExactArgs({ code: '200', message: 'user sucessfully registered' })

        var query = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          facebook: false,
          salt: '123'
        }

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

