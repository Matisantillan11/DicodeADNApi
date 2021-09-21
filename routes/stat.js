const { Router, request, response } = require('express')
const { getStats } = require('../controllers/stat')

const router = Router()

router.get('/', getStats)

router.post('/', (req = request, res = response) => {
	res.json({
		msg: 'Response from POST Method - Stats ',
	})
})

module.exports = router
