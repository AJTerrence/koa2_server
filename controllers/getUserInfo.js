const models = require('../models/models')
const OAuth = require('wechat-oauth')

const appid = 'wx223a4560da9848f2'
const appsecret = 'c774257398922e77b15cf5b23ec29fe9'
const domain = 'http://127.0.0.1:8888/'
const redirect_uri = domain + 'oauth/user'
const client = new OAuth(appid,appsecret)

const index = function(ctx){
  equipmentId = ctx.query.equipmentId
  const url = client.getAuthorizeURL(redirect_uri, '123', 'snsapi_userinfo')
  ctx.redirect(url)
}

const getCode = function(ctx){
  const code = ctx.query.code

  //暂时解决code重复使用报错问题的拙劣方法，引入session?
  const URL = domain +''
  ctx.redirect(URL)

  client.getAccessToken(code,function(err,result){
    const openid = result.data.openid

    client.getUser(openid,function(err,result){
      const userInfo = result
      const user = {
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        sex: userInfo.sex,
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country,
        headimgurl: userInfo.headimgurl,
        privilege: userInfo.privilege,
        equipmentID: equipmentId,
        time: new Date()
      }
      try{
        models.userInfo.create(user)
      }catch (e){
        ctx.body = '获取用户信息失败' + e.message
        console.log(e)
      }
    })
  })
}

module.exports = {
  index,
  getCode
}