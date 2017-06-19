const models = require('../models/models')
const _ = require('lodash')

const getqrInfo = async function(ctx) {

  const qrcode = {
    qrcodeUrl: 'http://orrumi7ur.bkt.clouddn.com/wechat/qusaosaologo.jpg',
    WOAname: '趣扫扫',
    active: true,
    time: new Date()
  }
  try {
    const qcInfo = await models.qrcodeInfo.find({WOAname: '趣扫扫'})
    //const URL = []
    if (qcInfo == '') {
      models.qrcodeInfo.create(qrcode)
      ctx.body = [qrcode]
      console.log([qrcode])
    } else {
      ctx.body = qcInfo
      console.log(qcInfo)
     // _.each(qcInfo,function(r){
      //URL.push(r.qrcodeUrl)
      //})
      //ctx.body = URL
    }
  }catch(e){
    ctx.body = '错误' + e.message
    console.log(e)
  }
}

module.exports = {
  getqrInfo
}