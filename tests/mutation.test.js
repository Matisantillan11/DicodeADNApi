const mongoose = require('mongoose')
const supertest = require('supertest')
const server = require('../index')
const Mutation = require('../models/mutation')

const api = supertest(server.app)

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
})
