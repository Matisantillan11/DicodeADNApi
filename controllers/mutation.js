const Mutation = require('../models/mutation')
const Stat = require('../models/stat')

const { hasMutation } = require('../helpers/mutation/validateMutation')

const postMutation = async (req = request, res = response) => {
	const regex = new RegExp(/[^ACGT][^acgt]/)
	let invalidBase = false
	const { dna } = req.body

	dna.map((secuence) => {
		if (regex.test(secuence)) {
			return (invalidBase = true)
		}
	})

	if (invalidBase === false) {
		const { status, mutations, nomutations } = hasMutation(dna)

		if (status === false || mutations === 0) {
			res
				.status(403)
				.send({
					'status-code': 403,
					message: 'El ADN no contiene ninguna mutación',
				})
		} else {
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

			res.status(200).json({
				'status-code': 200,
				message: 'El ADN analizado contiene mutaciones',
				mutation,
			})
		}
	} else {
		res.status(400).json({
			'status-code': 400,
			message: "`Base on DNA can contain only 'A', 'C', 'G' & 'T' Letters.",
		})
	}
}

module.exports = {
	postMutation,
}
