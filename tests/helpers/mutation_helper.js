const supertest = require('supertest')
const { server } = require('../../index')

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

const getAllMutations = async () => {
	const response = await api.get('/api/stats').expect(200)
	const contents = response.body.stats.map((el) => el.dna)

	return { response, contents }
}

module.exports = { api, InitialMutations, getAllMutations }
