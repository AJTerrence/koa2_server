const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const path = require('path')
const static = require('koa-static')
const oauth = require('./routes/oauth')
const qrcode = require('./routes/qrcode')
const config = require('./config/config')
const app = new Koa()
const router = new Router()

require('./config/init')(app,mongoose)

app.use(static(path.resolve('views')))

app.use(bodyParser())

router.use('/user',oauth.routes(),oauth.allowedMethods())
router.use('/api',qrcode.routes(),qrcode.allowedMethods())
app.use(router.routes())

app.on('error',function(err,ctx){
  if(process.env.NODE_ENV != 'production'){
    ctx.body = '500 server error'
    console.error(err.message)
    console.error(err)
  }
})

app.listen(config.PORT)
console.log(`Koa server listen at port ${config.PORT}`)
