module.exports = {
  NODE_ENV: '"production"',
  host: 'localhost',
  port: process.env.PORT || 3000,
  database: {
    host: 'localhost',
    port: '27017',
    name: 'trezentos-db'
  },
  secret: 'chama nos hash mlkin'
}
