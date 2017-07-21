/*const wechatPay = require('../controllers/wechatPay')

router.get('')*/
const router = require('koa-router')()
const wechatPay = require('../controllers/wechatPay')

router.get('/test',wechatPay.test)
//router.get('/test1',wechatPay.test1)
module.exports = router