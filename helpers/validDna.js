const Mutation = require('../models/mutation')

const validateUniqueDna = async (dna = ['']) => {
	const filter = await Mutation.findOne({ dna })

	if (filter !== null) {
		throw new Error('We already analize this DNA')
	}
}

module.exports = {
	validateUniqueDna,
}
