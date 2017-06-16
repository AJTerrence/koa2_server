const getUserInfo = require('../controllers/getUserInfo')
const router = require('koa-router')()

router.get('/nd/:id', getUserInfo.index)

router.get('/admin', getUserInfo.getCode)

module.exports = router
