const models = require('../models/models')

const getqrInfo = async function(ctx){

  const qrcode = {
    qrcodeUrl: 'http://wx.qlogo.cn/mmopen/H2nmVeXvy6v9nJzWoOSDqgaHTQQTqy6iaNmaGoCaCSESg8ibxRh27jaPHoXmDdxQ1F3qJgjOSlz7f9Y11Sv1gXYETHU9oyKfSe/0',
    WOAname: '趣扫扫',
    active: 1,
    time: new Date()
  }
  try{
    const qcInfo = await models.qrcodeInfo.find({active:1})
     if(qcInfo == ''){
       models.qrcodeInfo.create(qrcode)
       for(var i=0;i<qcInfo.length;i++){
         const url = qcInfo[i].qrcodeUrl
         const URL = []
         URL.push(url)
         console.log(URL)
       }
    }else{
       for(var j=0;j<qcInfo.length;j++){
         const url = qcInfo[j].qrcodeUrl
         const URL = []
         URL.push(url)
         console.log(URL)
       }
    }
  }catch (e){
    ctx.body = '发生错误' + e.message
    console.log(e)
  }
}

module.exports = {
  getqrInfo
}