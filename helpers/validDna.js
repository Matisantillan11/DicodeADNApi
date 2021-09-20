const Mutation = require('../models/mutation')

const validateUniqueDna = async (dna) => {
	const dnaFinded = await Mutation.findOne({ dna })

	if (dnaFinded) {
		throw new Error(`We already analize dna: ${dna}`)
	}
}

module.exports = {
	validateUniqueDna,
}
