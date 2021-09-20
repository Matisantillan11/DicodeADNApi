const Mutation = require('../models/mutation')
const { hasMutation } = require('../helpers/validateMutation')
const postMutation = (req = request, res = response) => {
	const regex = new RegExp(/[^ACGT][^acgt]/)
	const { dna } = req.body

	dna.map((secuence) => {
		if (regex.test(secuence)) {
			res.status(400).send({
				error: `Base on DNA can contain only "A", "C", "G" & "T" Letters. Error in secuence: ${secuence}`,
			})
		}
	})

	const { status, mutations, nomutations } = hasMutation(dna)

	const mutation = new Mutation({ dna, hasMutation: status })
	//mutation.save(mutation)

	res.json({
		mutation,
		quantityMutations: mutations,
		quantityNoMutations: nomutations,
		ratio: mutations / nomutations,
	})
}

module.exports = {
	postMutation,
}
