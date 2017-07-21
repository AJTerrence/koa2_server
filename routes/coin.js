const getCoin = require('../controllers/getCoin')
const router = require('koa-router')()

router.get('/coin/get_token',getCoin.getToken)
router.get('/coin/verify_token',getCoin.verifyToken_getCoin)

module.exports = router