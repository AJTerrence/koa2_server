const models = require('../models/models')

const getqrcodeInfo = async function(ctx) {

  const qrcode = {
    appid: 'wxe269be5d7e65716d',
    qrcodeUrl: 'http://orrumi7ur.bkt.clouddn.com/wechat/qusaosaologo.jpg',
    WOA: '趣扫扫',
    active: true,
    create_at: new Date()
  }
  try {
    const qcInfo = await models.qrcodeInfo.find({active: true})
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

const getUserCoin = async function(ctx){
  const openid = ctx.session.openid
  if(openid){
    const result = await models.userInfo.findOne({openid: openid})
    ctx.body = {
      success: true,
      coin: result.coin
    }
  }else{
    ctx.body = {
      success: false,
      msg: 'please scan the qrcode again'
    }
    }
  }

module.exports = {
  getqrcodeInfo,
  getUserCoin
}