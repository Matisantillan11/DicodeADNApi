const { Router, response, request } = require('express')
const { check } = require('express-validator')
const { postMutation } = require('../controllers/mutation')
const { validateUniqueDna, validateBase } = require('../helpers/validDna')
const validateEntries = require('../middlewares/validateEntries')

const router = Router()

router.get('/', (req = request, res = response) => {
	res.json({
		msg: 'Response from GET Method - Mutation ',
	})
})

router.post(
	'/',
	[
		check('dna', 'DNA must be provided to analize').notEmpty(),
		check('dna', 'DNA must be an array').isArray(),
		check('dna').custom(validateUniqueDna),
		/* check('dna').custom(validateBase), */

		validateEntries,
	],
	postMutation,
)

module.exports = router
