const mongoose = require('mongoose')
const supertest = require('supertest')

const Stat = require('../models/stat')

const { server, listen } = require('../index')

const api = supertest(server.app)

const initialStats = [
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
	await Stat.deleteMany({})

	for (let stat of initialStats) {
		const statObject = new Stat(stat)
		await statObject.save()
	}
})

test('database contain same quantity of Dna analized than stats.length', async () => {
	const response = await api.get('/api/stats/')
	expect(response.body.stats).toHaveLength(initialStats.length)
})

test('must contain [ATGCGA, CAGTGC, TTATGT]', async () => {
	const response = await api.get('/api/stats/')
	const stats = await response.body.stats.map((stat) => stat.dna)

	expect(stats).arrayContaining(['ATGCGA', 'ZZZZ', 'TTATGT'])
})

test('stats returned as json and status 200', async () => {
	await api
		.get('/api/stats')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

afterAll(() => {
	mongoose.connection.close()
	listen.close()
})
