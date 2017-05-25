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
          ownerEmail: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var savedClass = {
          name: 'test class',
          ownerEmail: 'test@test.com',
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
      })

      it('should sucessfully if class already exists', (done) => {
        var query = {
          name: 'test class',
          ownerEmail: 'test@test.com',
          institution: 'test institution',
          passingScore: '5',
          additionScore: '1',
          password: '123456',
          students: '40',
          numberOfStudentsPerGroup: '5'
        }

        var savedClass = {
          name: 'test class',
          ownerEmail: 'test@test.com',
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
      })
    })

      describe('when found class', () => { 
        it('should sucessfully return classes', (done) => {
          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          // mock.expects('send').once().withExactArgs([{ 
          //   additionScore: 1,
          //   institution: 'test institution',
          //   name: 'test class',
          //   numberOfStudentsPerGroup: 5,
          //   ownerEmail: 'test@test.com',
          //   passingScore: 5,
          //   password: '123456',
          //   students: [ '40' ]
          // }])

          classController.findClasses({}, response)
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
        });
        
        it('should sucessfully return classes from user', (done) => {
          var query = {
            email: 'test@test.com'
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)

          classController.findClassesFromUser({query: query}, response)
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
        });
    })

    describe('when inserted user in class', () => { 
        it('should sucessfully insert user in classes', (done) => {
          var query = {
            student: 'student@email.com',
            name: 'test class',
            email: 'test@test.com',
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})

          classController.insertUserInClass({query: query}, response)
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
      });
    })  

    describe('when update class', () => { 
        it('should sucessfully update', (done) => {
          var query = {
            userClass: '{"name": "cecilia"}',
            oldName: 'test class',
            email: 'test@test.com',
          }

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})

          classController.update({query: query}, response)
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
      });
    })  

  })
})
