const { Schema, model } = require('mongoose')

const statSchema = Schema({
	dna: {
		type: [String],
		require: [true, 'DNA must be provided'],
	},
	has_mutation: {
		type: Boolean,
		require: false,
		default: false,
	},
	count_mutations: {
		type: Number,
		require: [true, 'The count of mutations must be provided'],
		default: 0,
	},
	count_no_mutations: {
		type: Number,
		require: [true, 'The count of no mutations must be provided'],
		default: 0,
	},
	ratio: {
		type: Number,
		require: false,
		default: 0,
	},
})

statSchema.methods.toJSON = function () {
	const { __v, ...stat } = this.toObject()
	return stat
}

module.exports = model('Stat', statSchema)
