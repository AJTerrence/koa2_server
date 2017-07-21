const models = require('../models/models')
const request = require('request-promise')
const Promise = require('bluebird')

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

module.exports = {
	getToken,
	verifyToken_getCoin
}