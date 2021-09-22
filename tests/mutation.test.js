const mongoose = require('mongoose')
const Mutation = require('../models/mutation')

const { listen } = require('../index')

const {
	api,
	InitialMutations,
	getAllMutations,
} = require('./helpers/mutation_helper')

beforeEach(async () => {
	await Mutation.deleteMany({})

	for (let mutation of InitialMutations) {
		const mutationObject = new Mutation(mutation)
		await mutationObject.save()
	}
})

test('stats contain same quantity of Dna analized', async () => {
	const { response } = await getAllMutations()
	expect(response.body.stats).toHaveLength(InitialMutations.length)
})

test('mutation is created correctly', async () => {
	const newDNA = new Mutation({
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
	})

	await api
		.post('/api/mutation')
		.send(newDNA)
		.expect('Content-Type', /application\/json/)

	const { contents } = await getAllMutations()

	contents.map((el) => {
		expect.arrayContaining(el)
	})
})

test('mutation returned as json', async () => {
	await api
		.get('/api/stats')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
	listen.close()
})
