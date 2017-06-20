module.exports = {
  PORT: process.env.PORT || 3000,
  mongo: {
    'development': {
      connectionString: 'mongodb://localhost/wechat-test'
    },
    'production': {
      connectionString: 'mongodb://localhost/wechat'
    },
    opts: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  }
}