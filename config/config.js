module.exports = {
  PORT: process.env.PORT || 3000,
  cookieSecret: 'nowdone',
  mongo: {
    'development': {
      connectionString: 'mongodb://localhost/wechat-test'
    },
    'production': {
      connectionString: 'mongodb://localhost/wechat'
    },
    opts: {
      /*server: {
        socketOptions: {
          keepAlive: 1
        }
      }*/
      useMongoClient: true
    }
  }
}