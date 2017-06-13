const getUserInfo = require('../controllers/getUserInfo')
const getqrcodeInfo = require('../controllers/getqrcodeInfo')
const router = require('koa-router')()

router.get('/index', getUserInfo.index)
router.get('/user', getUserInfo.getCode)
router.get('/getinfo', getqrcodeInfo.getqrInfo)

module.exports = router