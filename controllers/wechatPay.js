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

const config = {
  appid: 'wx223a4560da9848f2',
  mch_id: '',
  spbill_create_ip: '',
  trade_type: 'JSAPI',
  fee_type: 'CNY',
  body:'wechatpay test',
  total_fee: 88,
  notify_url:'http://www.nowdone.com.cn'
}

const createNoncestr = function(){
  return Math.random().toString(36).substr(2,15)
}

const sign = function(){
}

const getXML = function(){

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

const preArray = {
  appid: config.appid,
  mch_id: config.mch_id,
  nonce_str: createNoncestr(),
  sign: sign(),
  body: config.body,
  out_trade_no: Time() + Math.random().toString().substr(2,10),
  total_fee: config.total_fee,
  spbill_create_ip: config.spbill_create_ip,
  notify_url: config.notify_url,
  trade_type: config.trade_type
}

const payment = function(ctx){
  const formData = getXML(preArray)

  request({
    url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    method: 'POST',
    body: formData
  },function(err,ctx){
    const bodyXML = ctx.body.toString('utf-8')
  })
}