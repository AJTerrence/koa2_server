/**
 * Created by terrence on 17-6-16.
 */
const request = require('request')
const crypto = require('crypto')
const xml2js = require('xml2js')
const qs = require('querystring')

const config = {
  appid: 'wx223a4560da9848f2',
  mch_id: '1230000109',
  spbill_create_ip: '127.0.0.1',
  trade_type: 'JSAPI',
  fee_type: 'CNY',
  body:'wechat payment',
  total_fee: 88,
  notify_url:'http://www.nowdone.com.cn'

}

const createNonce = function(){
  return Math.random().toString(36).substr(2,15)
}
const payment = function(){

}
const preArray = {
  appid:config.appid,
  mch_id:config.mch_id,
  spbill_create_ip:config.spbill_create_ip,
  trade_type:config.trade_type,
  notify_url:config.notify_url,
  fee_type:config.fee_type,
  nonce_str:createNonce(),
  body:config.body,
  total_fee:config.total_fee


}