const models = require('../models/models')
const OAuth = require('wechat-oauth')
const request = require('request-promise')
const Promise = require('bluebird')

const appid = 'wx223a4560da9848f2'
const appsecret = 'c774257398922e77b15cf5b23ec29fe9'
const domain = 'http://127.0.0.1:3000'
const redirect_uri = domain + '/user/admin'
const client = new OAuth(appid,appsecret)
var openid
var access_token
var deviceId

const callback = function(ctx){
  deviceId = ctx.params.deviceId
  const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri='+ redirect_uri + '&response_type=code' + 
  '&scope=snsapi_userinfo&state=123#wechat_redirect'
  ctx.redirect(url)
}
/*
const getUserCode = async function(ctx){
  const code = ctx.query.code
  const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + '&code=' + code + '&grant_type=authorization_code'
  return new Promise(function(resolve,reject){
    request({url: url}).then(function(response){
      if(response){
        const _data = JSON.parse(response)
         access_token = _data.access_token
         openid = _data.openid
        resolve(response)
        ctx.redirect('/user/getUserInfo')

      }else{
        throw new Error('fails')
      }
    }).catch(function(err){
      console.error(err)
      reject(err)
    })
  })
}
*/
const getUserCode = async function(ctx){
  const code = ctx.query.code
  const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + '&code=' + code + '&grant_type=authorization_code'
  return new Promise(function(resolve,reject){
    request({url: url}).then(function(response){
      if(response){
        const _data = JSON.parse(response)
        console.log(_data)
        access_token = _data.access_token
        openid = _data.openid
        const uri = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid  +'&lang=zh_CN'
        request({url:uri}).then(function(response){
          const data = JSON.parse(response)
          console.log(data)
        })
        resolve()
      }else{
        throw new Error('fails')
      }
    }).catch(function(err){
      console.error(err)
    })
  })
}

const getUserInfoByOpenid = async function(ctx,next){
  const url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid  +'&lang=zh_CN'
  return new Promise(function(resolve,reject){
    request({url: url}).then(async function(response){
      if(response){
        const _data = JSON.parse(response)
        const result = await models.userInfo.findOne({openid: openid})
        if(result == null){
          const user = {
            openid: openid,
            nickname: _data.nickname,
            sex: _data.sex,
            province: _data.province,
            city: _data.city,
            county: _data.county,
            headimgurl: _data.headimgurl,
            coin: 0,
            time: new Date()
          }
          try{
            models.userInfo.create(user)
          }catch(e){
            console.error(e)
          }
        }else{
          await next()
        }
        //ctx.session.openid = openid
        //ctx.session.deviceId = deviceId
        ctx.redirect('/')
        resolve(response)
      }else{
        throw new Error('fails')
      }
    }).catch(function(err){
      console.log(err)
      reject(err)
    })
  })
}
/*const getUserInfo = async function(ctx){
  const code = ctx.query.code
  client.getAccessToken(code,function(err,result){
    const openid = result.data.openid
    const access_token = result.data.access_token
    client.getUser(openid,async function(err,result){
      const userInfo = result
      const data = await models.userInfo.findOne({openid: openid})
      if(data == null){
        const coin = 0
        const user = {
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        sex: userInfo.sex,
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country,
        headimgurl: userInfo.headimgurl,
        coin: coin,
        time: new Date()
      }
      try{
        models.userInfo.create(user)
      }catch(e){
        console.error(e)
      }
      }else{
        console.log('next')
      }
    })
  })
}
*/
module.exports = {
  callback,
  getUserCode,
  getUserInfoByOpenid
}

