const Mutation = require('../models/mutation')

const validateUniqueDna = async (dna = ['']) => {
	const filter = await Mutation.findOne({ dna })
	console.log(filter)
	if (filter !== null) {
		throw new Error('We already analize this DNA')
	}
}

module.exports = {
	validateUniqueDna,
}
