var env = process.env.NODE_ENV === 'testing'
  ? require('./test.env')
  : require('./dev.env')

module.exports = env