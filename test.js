const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors')
const session = require('koa-session2')
app.use(cors())
app.use(session({kry:'SESSIONID'}))
app.use(async(ctx)=>{
	if(ctx.url === '/'){
		ctx.cookies.set('cid','hello',{
			domain: 'localhost',
			path: '/',
			maxAge: 2*60*1000,
			httpOnly: false,
			overwrite: false
		})
		ctx.session.user = 'test'
		ctx.redirect('/set')
	}else{
		ctx.body = 'false'
	}
})
app.listen(3000)