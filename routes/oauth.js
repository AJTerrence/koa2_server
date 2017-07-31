const userInfo = require('../controllers/userInfo')
const router = require('koa-router')()

router.get('/nd/:deviceId', userInfo.callback)

router.get('/admin', userInfo.getUserCode)
router.get('/getUserInfo',userInfo.getUserInfoByOpenid)

module.exports = router
