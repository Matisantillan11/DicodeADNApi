const { Router } = require('express')
const { getStats } = require('../controllers/stat')

const router = Router()

router.get('/', getStats)

module.exports = router
