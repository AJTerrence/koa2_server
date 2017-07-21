const models = require('../models/models')

const getqrcodeInfo = async function(ctx) {

  const qrcode = {
    qrcodeUrl: 'http://orrumi7ur.bkt.clouddn.com/wechat/qusaosaologo.jpg',
    WOA: '趣扫扫',
    active: true,
    time: new Date()
  }
  try {
    const qcInfo = await models.qrcodeInfo.find({WOA: '趣扫扫'})
    if (qcInfo == '') {
      await models.qrcodeInfo.create(qrcode)
      ctx.body = [qrcode]
    } else {
      ctx.body = qcInfo
    }
  }catch(e){
    ctx.body = 'error:' + e.message
    console.log(e)
  }
}

module.exports = {
  getqrcodeInfo
}