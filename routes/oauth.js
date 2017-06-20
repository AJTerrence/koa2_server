const userInfo = require('../controllers/userInfo')
const router = require('koa-router')()

router.get('/nd/:id', userInfo.callback)

router.get('/admin', userInfo.getUserInfo)

module.exports = router
