const getCoin = require('../controllers/getCoin')
const router = require('koa-router')()

router.get('/coin/get_token',getCoin.getToken)
router.get('/coin/verify_token',getCoin.verifyToken_getCoin)
router.get('/coin/create_token',getCoin.createToken)
router.get('/coin/verify_token_by_time',getCoin.verifyToken)
router.get('/coin/income_statistics_index',getCoin.incomeStatistics)

module.exports = router