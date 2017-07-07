const models = require('../models/models')
const OAuth = require('wechat-oauth')

const appid = ''
const appsecret = ''
const domain = 'http://127.0.0.1:3000'
const redirect_uri = domain + '/user/admin'
const client = new OAuth(appid,appsecret)

const callback =  function(ctx){
  id = ctx.params.id
  const url =  client.getAuthorizeURL(redirect_uri, '123', 'snsapi_userinfo')
  ctx.session = {
    user_id: Math.random().toString(36).substr(2),
  }
  ctx.redirect(url)
}

const getUserInfo = async function(ctx){
  const code = ctx.query.code

  ctx.redirect(domain)

  client.getAccessToken(code,function(err,result){
    openid = result.data.openid
    const access_token = result.data.access_token

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
        ID: id,
        time: new Date()
      }
      console.log(user)

      try{
        models.userInfo.create(user)
      }catch (e){
        ctx.body = 'error:' + e.message
        console.log(e)
      }
    })
  })
}


module.exports = {
  callback,
  getUserInfo
}