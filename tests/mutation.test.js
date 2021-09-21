const mongoose = require('mongoose')
const supertest = require('supertest')
const { server, listen } = require('../index')
const Mutation = require('../models/mutation')

const api = supertest(server.app)

const InitialMutations = [
	{
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT'],
		hasMutation: true,
		ratio: 0,
		countMutation: 0,
		countNoMutation: 0,
	},
	{
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
		hasMutation: true,
		ratio: 0,
		countMutation: 0,
		countNoMutation: 0,
	},
]

beforeEach(async () => {
	await Mutation.deleteMany({})

	InitialMutations.map(async (sample) => {
		const mutation = new Mutation(sample)
		await mutation.save()
	})
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

test('first dna to analize has mutation', async () => {
	const response = await api.get('/api/mutation/stats')
	expect(response.body.mutations[0].hasMutation).toBe(true)
})

test('some dna is [ATGCGA, CAGTGC, TTATGT]', async () => {
	const response = await api.get('/api/mutation/stats')
	const contents = response.body.mutations.map((mutation) => mutation.dna)

	expect(contents).toContain('ATGCGA', 'CAGTGC', 'TTATGT')
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
