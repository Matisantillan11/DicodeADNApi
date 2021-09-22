const mongoose = require('mongoose')
const supertest = require('supertest')
const Mutation = require('../models/mutation')

const { server, listen } = require('../index')

const api = supertest(server.app)

const InitialMutations = [
	{
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT'],
		hasMutation: true,
	},
	{
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
		hasMutation: true,
	},
]

beforeEach(async () => {
	await Mutation.deleteMany({})

	for (let mutation of initialStats) {
		const mutationObject = new Stat(mutation)
		await mutationObject.save()
	}
})

test('database contain same quantity of Dna analized than mutations.length', async () => {
	const response = await api.get('/api/mutation/stats')
	expect(response.body.mutations).toHaveLength(InitialMutations.length)
})

test('mutation is created correctly', async () => {
	const newDNA = new Mutation({
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
	})

	await api
		.post('/api/mutation')
		.send(newDNA)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/mutation/stats').expect(200)

	const contents = response.body.mutations.map((el) => el.dna)

	contents.map((el) => {
		expect.arrayContaining(el)
	})
})

test('mutation returned as json', async () => {
	await api
		.get('/api/mutation/stats')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
	listen.close()
})
