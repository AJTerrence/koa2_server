const models = require('../models/models')
const _ = require('lodash')

const getqrInfo = async function(ctx) {

  const qrcode = {
    qrcodeUrl: 'http://wx.qlogo.cn/mmopen/H2nmVeXvy6v9nJzWoOSDqgaHTQQTqy6iaNmaGoCaCSESg8ibxRh27jaPHoXmDdxQ1F3qJgjOSlz7f9Y11Sv1gXYETHU9oyKfSe/0',
    WOAname: '趣扫扫',
    active: true,
    time: new Date()
  }
  try {
    const qcInfo = await models.qrcodeInfo.find({active: true})
    //const URL = []
    if (qcInfo == '') {
      models.qrcodeInfo.create(qrcode)
      ctx.body = [qrcode]
      console.log([qrcode])
    } else {
      ctx.body = qcInfo
      console.log(qcInfo)
      //_.each(qcInfo,function(r){
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