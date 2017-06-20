const config = require('./config')
const logger = require('koa-logger')

module.exports = function(app,mongoose){
  switch (app.env){
    case 'development':
      app.use(logger('dev'))
      break
    case 'production':
      app.use(require('koa-logger')({
        path: __dirname + './log/request.log'
      }))
      break
  }
  switch (app.env){
    case 'development':
      mongoose.connect(config.mongo.development.connectionString,config.mongo.opts)
      break
    case 'production':
      mongoose.connect(config.mongo.production.connectionString,config.mongo.opts)
      break
    default:
      throw new Error(app.env + 'can not connect to mongodb')
  }
}