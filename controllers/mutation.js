const Mutation = require('../models/mutation')
const Stat = require('../models/stat')

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

	dna.map((secuence) => {
		if (regex.test(secuence)) {
			return res.status(400).json({
				error: `Base on DNA can contain only "A", "C", "G" & "T" Letters. Error in secuence: ${secuence}`,
			})
		}
	})

	const { status, mutations, nomutations } = hasMutation(dna)

	if (status === false || mutations === 0) {
		return res.status(403).json({ msg: 'El ADN no contiene ninguna mutación' })
	}

	const mutation = new Mutation({
		dna,
		has_mutation: status,
	})

	const stat = new Stat({
		dna,
		count_mutations: mutations,
		count_no_mutations: nomutations,
		ratio: mutations / nomutations,
		has_mutation: status,
	})

	await mutation.save()
	await stat.save()

	return res.status(200).json({
		'status-code': 200,
		message: 'El ADN analizado contiene mutaciones',
		mutation,
	})
}
module.exports = {
	postMutation,
	getMutation,
}
