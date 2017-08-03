const models = require('../models/models')
const request = require('request-promise')

const appid = 'wx223a4560da9848f2'
const appsecret = 'c774257398922e77b15cf5b23ec29fe9'
const domain = 'http://127.0.0.1:3000'
const redirect_uri = domain + '/user/admin'
var openid,access_token,deviceId

const callback = function(ctx){
    deviceId = ctx.params.deviceId
    const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirect_uri + 
    '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
    ctx.redirect(url)
}

const getUserInfo = async function(ctx,next){
    const code = ctx.query.code
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + appsecret + 
    '&code=' + code + '&grant_type=authorization_code'
    const data = await request({url:url}).then(function(result){
      return result
    }).catch(function(err){
      throw new Error('fails')
    })
    const _data = JSON.parse(data)
    openid = _data.openid
    access_token = _data.access_token
    const uri = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid  +'&lang=zh_CN'
    const DATA = await request({url:uri}).then(function(response){
      return response
    }).catch(function(err){
      throw new Error('fails')
    })
    const _DATA = JSON.parse(DATA)
    const user = {
      openid: _DATA.openid,
      nickname: _DATA.nickname,
      sex: _DATA.sex,
      language: _DATA.language,
      city: _DATA.city,
      province: _DATA.province,
      country: _DATA.country,
      headimgurl: _DATA.headimgurl,
      privilege: _DATA.privilege,
      deviceId: deviceId,
      create_at: new Date()
    }
    const coin = {
      openid: _DATA.openid,
      coin: 0,
      create_at: new Date()
    }
    await models.coinInfo.findOne({openid: _DATA.openid},async function(err,doc,next){
      if(err) throw err
        if(doc === null){
          models.coinInfo.create(coin)
        }else{
        await next()    
        }
    })
    try{
      models.userInfo.create(user)
      ctx.session.deviceId = deviceId
      ctx.session.openid = openid
      ctx.redirect('/?deviceId='+deviceId+'&openid='+openid)
    }catch(e){
      console.error(e)
    }
}

module.exports = {
  callback,
  getUserInfo
}