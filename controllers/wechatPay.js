/*
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
const spbill_create_ip = '',
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
},function(err,response,body){
  if(err){
    console.log(err)
  }else{
    console.log(response.body)
    xml2js.parseString(response.body,{trim;true},function(err,result){
      if(err){
        console.error(err)
      }else{
        console.log(result)
      }
    })
  }
})
}


const request = require('request')
const xml2js = require('xml2js')
const crypto = require('crypto')

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

const getTimeStamp = function(){
  return parseInt(new Date().getTime() / 1000) + ''
}

const getNonceStr = function(){
  return Math.random().toString(36).substr(2, 15)
}

const getXmlFormat = function(_array){
  const keys = Object.keys(_array)
  const _xmlData = '<xml>'
  keys.forEach(function(key){
    _xmlData += '<' + key + '>' + _array[key] + '</' + key + '>'
  })
  const _paySign = paySign(_array)
  _xmlData += '<sign>' + _paySign +  '</sign>'
  _xmlData += '<xml>'
  return _xmlData
}

const getXMLNodeValue = function(node_name,xml){
  const tmp = xml.split('<' + node_name + '>')
  const _tmp = tmp[1].split('</' + node_name + '>')
  return _tmp[0]
}

const config = {
  appid: '',
  appSecret: '',
  mch_id: '',
  limit_pay: no_credit,
  notify_url: '',
  prepay_id_url: ''
}

const getWechatPayid = function(_spbillId,_traType,_openid,_out_trade_no,_attach,_body,_cb,_cbfail){
  const _preArray = {
    appid: config.appid,
    mch_id: config.mch_id,
    notify_url: config.notify_url,
    out_trade_no: _out_trade_no || Time() + Math.random().toString().substr(2,10),
    attach: _attach || 'wechatpay test',
    body: _body || 'wechatpay test',
    openid: _openid || '',
    spbill_create_ip: _spbillId || '127.0.0.1',
    time_stamp: getTimeStamp(),
    trade_type: _traType || 'JSAPI',
    total_fee: 1,
    nonce_str: getNonceStr(),
    limit_pay: config.limit_pay
  }
  const _formData = getXmlFormat(_preArray)
  request({
    url: config.prepay_id_url,
    method: 'POST',
    body: _formData
  },function(err,response,body){
    if(!err && response.statusCode == 200){
      const _reBodyXml = body.toString('utf-8')
      const _reCode = getXMLNodeValue('return_code',_reBodyXml,false)

      const rePrepayId = {
        prepay_id: '',
        code_url: '',
        timestamp: _preArray.time_stamp,
        nonceStr: _preArray.nonce_str,
        paySign: '',
        msg: 'request prepay_id'
      }
      if(_reCode == 'SUCCESS'){
        const _resultCode = getXMLNodeValue('result_code',_reBodyXml,false)
        if(_resultCode == 'SUCCESS'){
          rePrepayId.prepay_id = getXMLNodeValue('prepay_id',_reBodyXml,false)
          rePrepayId.msg = 'get prepay_id success'
          if(_preArray.trade_type == 'NATIVE'){
            rePrepayId.code_url = getXMLNodeValue('code_url',_reBodyXml,false)
          }else if(_preArray.trade_type == 'JSAPI'){
            const _signPara = {
              appid: config.appid
              timeStamp: _preArray.time_stamp
              nonceStr: _preArray.nonce_str
              package: 'prepay_id=' + rePrepayId.prepay_id
              signType: 'MD5'
            }
            rePrepayId.paySign = paySign(_signPara)
          }
        }else{
          rePrepayId.msg = getXMLNodeValue('err_code_des',_reBodyXml,false)
        }
        _cb && _cb(rePrepayId)
      }else if(_reCode == 'FAIL'){
        rePrepayId.msg = getXMLNodeValue('return_msg',_reBodyXml,false)
        _cbfail && _cbfail(rePrepayId)
      }
    }
  })
  _formData = null
}
*/
const userInfo = require('./userInfo')
const fs = require('fs')
const Payment = require('wechat-pay').Payment
const middleware = require('wecat-pay').middleware

const initConfig = {
  partnetKey: '',
  appId: '',
  mchId: '',
  notifyUrl: '',
  pfx: fs.readFileSync('./wxpay_cert.p12')
}
const payment = new Payment(initConfig)

const createUnifiedOrder = function(ctx){
  const order = {
    body: 'wechatpay test',
    attach: '{"test"}',
    out_trade_no: (+new Date) + Math.random().toString().substr(2,2)
    total_fee: '',
    spbill_create_ip: '',
    openid: userInfo.getopenid(),
    trade_type: 'JSAPI'
  }
  payment.getBrandWCPayRequestParams(order,function(err,payargs){
    if(err){
      console.log(err)
    }else{
      console.log(payargs)
      ctx.body = payargs
    }
  })
}

const payCallback = function(ctx){
  middleware(initConfig).getNotify().done(function(message,ctx,next){
    const openid = message.openid
    const order_id = message.out_trade_no
    const attach = {}

    if(message.return_code == 'SUCCESS' && message.result_code == 'SUCCESS'){
      ctx.body = 'success'
    }else{
      console.log('FAIL')
    }
  })
}