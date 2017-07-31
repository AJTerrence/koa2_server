const router = require('koa-router')()
const qrcodeInfo = require('../controllers/qrcodeInfo')

router.get('/qrcode',qrcodeInfo.getqrcodeInfo)
router.get('/getUserCoin',qrcodeInfo.getUserCoin)

module.exports = router