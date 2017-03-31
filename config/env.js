var env = process.env.NODE_ENV === 'testing'
  ? require('./test.env')
  : require('./prod.env')

module.exports = env
