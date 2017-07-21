const userInfo = require('../controllers/userInfo')
const router = require('koa-router')()

router.get('/nd', userInfo.callback)

router.get('/admin', userInfo.getUserCode)
router.get('/getUserInfo',userInfo.getUserInfoByOpenid)

module.exports = router
