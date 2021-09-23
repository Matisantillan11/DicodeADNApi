const { hasMutation } = require('../helpers/mutation/validateMutation')

test('check if specific DNA has mutation', () => {
	const mutation = hasMutation([
		'ATGCGA',
		'CAGTGC',
		'TTATGT',
		'AGAAGG',
		'CCCCTA',
		'TCACTG',
	])

	expect(mutation.status).toBe(true)
})

test("check if specific DNA doesn't has mutation", () => {
	const mutation = hasMutation(['ATGCGA', 'CAGTGC', 'ATCCGA', 'CAGTGC'])

	expect(mutation.status).toBe(false)
})
