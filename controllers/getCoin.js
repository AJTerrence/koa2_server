const models = require('../models/models')
const request = require('request-promise')
const Promise = require('bluebird')
const crypto = require('crypto')

const getToken = async function(ctx){
	const token = ctx.query.token
	const appid = ctx.query.appid
	const openid = ctx.query.openid
	const data = {
		appid: appid,
		openid: openid,
		token: token,
		used: false,
		time: new Date()
	}
	try{
		models.tokenInfo.create(data)
		ctx.body = {
			success: true,
		}
	}catch(e){
		console.error(e)
	}
}

const verifyToken_getCoin = async function(ctx){
	const token = ctx.query.token
	try{
		const result = await models.tokenInfo.findOne({token: token})
		console.log(result)
		if(result == null){
			ctx.body = {
				success: false,
				msg: 'token illegal'
			}
		}else if(result){
			if(result.used === true){
				ctx.body = {
					success: false,
					msg: 'token has been used'
				}
			}else{
				const openid = result.openid
				const deviceId = ctx.session.deviceId
				await models.tokenInfo.update({openid: openid},{$set:{used: true}})
				if(ctx.session.deviceId){
				//await models.coinInfo.update({openId: openId},{$inc:{coin: 1}})//error
				const url = 'http://localhost:8000/api/v1/order/create_order?deviceId=' + deviceId + '&openid=' + openid + '&type=ads&price=1'
				return new Promise(function(resolve,reject){
					request({url:url}).then(async function(response){
						console.log(response)
						const _data = JSON.parse(response)
						if(_data.success == true){
							await models.coinInfo.update({openid: openid},{$inc:{coin: 1}})
							ctx.body = {
								success: true,
								msg: 'success'
							}
							resolve(_data)
						}else{
							throw new Error('fails')
							reject(_data)
						}
					}).catch(function(err){
						console.error(err)
					})
				})
			}else{
				console.log('please scan the qrcode again')
			}
			}
		}
	}catch(e){
		console.error(e)
	}
}

const insertCoin = async function(ctx){
	const appid = ctx.query.appid
	const token = ctx.query.token
	const openid = ctx.session.openid
	if(!openid){
		ctx.body = {success: false,message:'please scan the qrcode again'}
	}else{
		await models.tokenInfo.findOne({appid: appid,token: token},async function(err,doc){
			if(err) throw err
				if(doc == null){
					await next()
				}else if(doc.openid === openid){
					ctx.body = {success: false,message: '只能领取一次'}
				}else if(doc.openid!=openid){
					ctx.redirect('/')
				}
		})
	}
}

const createToken = async function(ctx){
	const appid = ctx.query.appid
	const openid = ctx.query.openid
	const token = crypto.createHmac('sha1','nowdone').update(appid+openid).digest('base64')
	await models.tokenInfo.findOne({token:token},async function(err,doc){
		if(err) throw err
			if(doc === null){
				const Token = {
					appid: appid,
					openid: openid,
					token: token,
					active: true,
					time: Date.now()
				}
				models.tokenInfo.create(Token)
				ctx.body = {success: true,token:token}
			}else{
				await models.tokenInfo.update({token:token},{$set:{time:Date.now()}},function(err,result){
					if(err) throw err
					console.log(result)
				})
				ctx.body = {success: true,token:token}
			}
	})
}

const verifyToken = async function(ctx){
	const token = ctx.query.token
	const deviceId = ctx.query.deviceId
	await models.tokenInfo.findOne({token: token},async function(err,doc){
		if(err) throw err
			if(doc === null){
				ctx.body = {success: false,message:'illegal token'}
			}else if(doc.active === true){
				const now = Date.now()
				if(now-doc.time<1*60*1000){
				    await models.tokenInfo.update({token:token},{$set:{active:false}},function(err,result){
				    	if(err) throw err
				    		console.log(result)
				    })
				    ctx.body = {success:true,message:'receive coin succeed'}
				    await models.orderInfo.findOne({deviceId:deviceId}, function(err,doc){
				    	if(doc === null){
				    		const order = {account:'',deviceId:deviceId,total:0,ads:0,coinincome:0,create_at:new Date()}
				    		models.orderInfo.create(order)
				    		//ctx.body = {success:true,message:'receive coin succeed'}
				    	}else{
				    		console.log('order exist')
				    	}
				    })
				    await models.orderInfo.update({deviceId:deviceId},{$inc:{ads:1}},function(err,result){
				    	console.log(result)
				    })
					//ctx.body = {success:true,message:'receive coin succeed'}
				}else{
					ctx.body = {success:false,message:'please scan the qrcode again'}
				}
			}else if(doc.active === false){
				ctx.body = {success: false,message: '游戏币已领取'}
			}
	})
}

const incomeStatistics = async function(ctx){
	const deviceId = '666'
	await models.orderInfo.findOne({deviceId:deviceId},function(err,doc){
		if(doc === null){
			ctx.body = {success: true,data: {ads:0,coinincome:0,total:0}}
		}else{
			ctx.body = {success:true,data:{ads:doc.ads,coinincome:doc.coinincome,total:doc.total}}
		}
	})
}

module.exports = {
	getToken,
	verifyToken_getCoin,
	verifyToken,
	createToken,
	incomeStatistics
}