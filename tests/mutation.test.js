const mongoose = require('mongoose')
const supertest = require('supertest')
const { server, listening } = require('../index')
const Mutation = require('../models/mutation')

const api = supertest(server.app)

test('mutation is returned as json', async () => {
	const newDNA = {
		dna: ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'],
	}

	await api
		.post('/api/mutation')
		.send(newDNA)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/mutation')
	const contents = response.body.map((mutation) => mutation.dna)

	expect(contents).toContain(newDNA.dna)
})

afterAll(() => {
	mongoose.connection.close()
})
