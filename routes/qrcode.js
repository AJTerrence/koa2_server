/**
 * Created by terrence on 17-6-16.
 */
const router = require('koa-router')()
const getqrcodeInfo = require('../controllers/getqrcodeInfo')

router.get('/qrcode',getqrcodeInfo.getqrInfo)

module.exports = router