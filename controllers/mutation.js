const Mutation = require('../models/mutation')
const { hasMutation } = require('../helpers/validateMutation')

const getMutation = async (req = request, res = response) => {
	const mutations = await Mutation.find()
	res.status(200).json({
		mutations,
	})
}

const postMutation = async (req = request, res = response) => {
	const regex = new RegExp(/[^ACGT][^acgt]/)
	const { dna } = req.body

	console.log(dna)
	dna.map((secuence) => {
		if (regex.test(secuence)) {
			return res.status(400).json({
				error: `Base on DNA can contain only "A", "C", "G" & "T" Letters. Error in secuence: ${secuence}`,
			})
		}
	})

	const { status, mutations, nomutations } = hasMutation(dna)
	const mutation = new Mutation({
		dna,
		countMutations: mutations,
		countNoMutations: nomutations,
		ratio: mutations / nomutations,
		hasMutation: status,
	})

	await mutation.save()

	return res.status(201).json({
		mutation,
	})
}
module.exports = {
	postMutation,
	getMutation,
}
