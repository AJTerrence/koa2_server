/*
const WXPay = require('weixin-pay')
const fs = require('fs')

const wxpay = WXPay({
  appid: '',
  mch_id: '',
  partner_key: '',
  pfx: fs.readFileSync('./wxpay_cert.p12')
})

const Time = function(){
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  if(month < 10 && day < 10){
    return year.toString() + '0' + month.toString() + '0' + day.toString()
  }else if(month < 10 && day > 10){
    return year.toString() + '0' + month.toString() + day.toString()
  }else if(month > 10 && day < 10){
    return year.toString() + month.toString() + '0' + day.toString()
  }else if(month >10 && day >10){
    return year.toString() + month.toString() + day.toString()
  }
}

wxpay.getBrandWCPayRequestParams({
  openid: '',
  body: 'test',
  detail: 'pay test',
  out_trade_no: Time() + Math.random().toString().substr(2,10),
  total_fee: 1,
  spbill_create_ip: '127.0.0.1',
  notify_url: 'http://www.nowdone.com.cn/pay'
},function(err,result){

})
*/

const request = require('request')
const crypto = require('crypto')
const xml2js = require('xml2js')
const userInfo = require('./userInfo')

const createNoncestr = function(){
  return Math.random().toString(36).substr(2,15)
}

const Time = function(){
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  if(month < 10 && day < 10){
    return year.toString() + '0' + month.toString() + '0' + day.toString()
  }else if(month < 10 && day > 10){
    return year.toString() + '0' + month.toString() + day.toString()
  }else if(month > 10 && day < 10){
    return year.toString() + month.toString() + '0' + day.toString()
  }else if(month >10 && day >10){
    return year.toString() + month.toString() + day.toString()
  }
}

const _sign = function(){
  const stringA = 'appid=' + appid + '&attach=' + attach + '&body=' + body + '&mch_id' + mch_id
  + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no
  + '&spbill_create_ip=' + spbill_create_ip + '&total_fee=' + total_fee + '&trade_type=' + trade_type

  const stringSignTemp = stringA + '&key=192006250b4c09247ec02edce69f6a2d'
  return crypto.createHash('md5').update(stringSignTemp,'utf-8').digest('hex')
}

const appid = 'wx223a4560da9848f2',
const mch_id = '1230000109',
const attach = 'payment'
const nonce_str = createNoncestr(),
const sign = _sign(),
const body = 'wechat-pay',
const out_trade_no = Time() + Math.random().toString().substr(2,10),
const total_fee = 1,
const spbill_create_ip = '127.0.0.1',
const notify_url = 'http://www.nowdone.com.cn/pay',
const trade_type = 'JSAPI',
const openid = userInfo.getUserInfo.openid

const paymnet = function(){
const formData = '<xml>';
formData += '<appid>' + appid + '</appid>';
formData += '<attach>' + attach + '</attach>';
formData += '<body>' + body + '</body>';
formData += '<mch_id>' + mch_id + '</mch_id>';
formData += '<nonce_str>' + nonce_str + '</nonce_str>';
formData += '<notify_url>' + notify_url + '</notify_url>';
formData += '<openid>' + openid + '</openid>';
formData += '<out_trade_no>' + out_trade_no + '</out_trade_no>';
formData += '<spbill_create_ip>' + spbill_create_ip + '</spbill_create_ip>';
formData += '<total_fee>' + total_fee + '</total_fee>';
formData += '<trade_type>' + trade_type + '</trade_type>';
formData += '<sign>' + sign + '</sign>';
formData += '<xml>';

request({
  url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  method: 'POST',
  body: formData
},function(err,ctx){
  if(err){
    console.log(err)
  }else{
    console.log(ctx.body)
  }
})