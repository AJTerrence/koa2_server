const userInfo = require('../controllers/userInfo')
const router = require('koa-router')()

router.get('/nd/:deviceId', userInfo.callback)

router.get('/admin', userInfo.getUserInfo)

module.exports = router
