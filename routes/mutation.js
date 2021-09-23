const { Router } = require('express')
const { check } = require('express-validator')
const { postMutation, getMutation } = require('../controllers/mutation')
const { validateUniqueDna } = require('../helpers/validDna')
const validateEntries = require('../middlewares/validateEntries')

const router = Router()

router.post(
	'/',
	[
		check('dna', 'DNA must be provided to analize').notEmpty(),
		check('dna', 'DNA must be an array').isArray(),
		check('dna').custom(validateUniqueDna),
		validateEntries,
	],
	postMutation,
)

module.exports = router
