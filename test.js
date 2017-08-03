const Koa = require('koa')
const app = new Koa()
app.use(async(ctx)=>{
	if(ctx.url === '/'){
		ctx.cookies.set('cid','hello',{
			domain: 'localhost',
			path: '/',
			maxAge: 1*60*1000,
			httpOnly: false,
			overwrite: false
		})
		ctx.body = 'ok'
	}else{
		ctx.body = 'false'
	}
})
app.listen(3000)