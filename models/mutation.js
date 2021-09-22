const { Schema, model } = require('mongoose')

const mutationSchema = Schema({
	dna: {
		type: [String],
		require: [true, 'DNA must be provided'],
	},
	hasMutation: {
		type: Boolean,
		require: false,
		default: false,
	},
	analized_at: {
		type: Date,
		require: false,
		default: new Date(),
	},
})

mutationSchema.methods.toJSON = function () {
	const { __v, _id, ...mutation } = this.toObject()
	return mutation
}

module.exports = model('Mutation', mutationSchema)
