const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const koaRouter = require('koa-router')
const oauth = require('./routes/oauth')
const config = require('./config/config')

const router = new koaRouter()

const app = new Koa()

//初始化配置
require('./config/init')(app,mongoose)

app.use(bodyParser())

router.use('/oauth',oauth.routes())

app.use(router.routes())

//错误处理
app.on('error',function(err,ctx){
  if(process.env.NODE_ENV != 'production'){
    ctx.body = '500 server error'
    console.error(err.message)
    console.error(err)
  }
})

app.listen(3000)
console.log('Koa start at port 3000')
