const router = require('koa-router')()
const qrcodeInfo = require('../controllers/qrcodeInfo')

router.get('/qrcode',qrcodeInfo.getqrcodeInfo)

module.exports = router