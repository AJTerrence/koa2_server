//参数设置
module.exports = {
  //设置服务器端口
  PORT:process.env.PORT || 3000,
  //session
  //cookieSecret:'c774257398922e77b15cf5b23ec29fe9',
  //mongodb设置
  mongo: {
    //开发时使用的数据库
    'development': {
      connectionString: 'mongodb://localhost/wechat-test'
    },
    //生产时使用的数据库
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