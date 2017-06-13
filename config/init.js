const config = require('./config')
const logger = require('koa-logger')

module.exports = function(app,mongoose){
  switch (app.env){
    case 'development':
      app.use(logger('dev'));
      break
    case 'production':
      app.use(require('koa-logger')({
        path: __dirname + './log/request.log'
      }))
      break
  }

  //根据不同环境连接不同数据库
  switch (app.env){
    case 'development':
      mongoose.connect(config.mongo.development.connectionString,config.mongo.opts)
      break
    case 'production':
      mongoose.connect(config.mongo.production.connectionString,config.mongo.opts)
      break
    default:
      throw new Error(app.env + '环境下无法连接数据库！')
  }
}