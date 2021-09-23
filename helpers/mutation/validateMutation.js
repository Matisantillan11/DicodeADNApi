const {
	convertToMatriz,
	joinElementsOfArray,
	convertToVertical,
} = require('./convertHelpers')

const { validateInvertDiagonal, validateDiagonal } = require('./diagonalHelper')

const { validateHorizontal } = require('./horizontalHelper')

const hasMutation = (dna) => {
	let status = true
	let nomutations = 0
	let mutations = 0

	let arrayTemp = convertToMatriz(dna)
	let arrayJoined = joinElementsOfArray(arrayTemp)

	const mutationsHorizontals = validateHorizontal(dna)
	const mutationsVerticals = validateVertical(arrayJoined)
	const mutationsDiagonals = validateDiagonal(arrayJoined)
	const mutationsInvertDiagonals = validateInvertDiagonal(arrayJoined)

	mutations =
		mutations +
		mutationsHorizontals.mutations +
		mutationsVerticals.mutations +
		mutationsDiagonals.mutations +
		mutationsInvertDiagonals.mutations

	nomutations =
		nomutations +
		mutationsHorizontals.nomutations +
		mutationsVerticals.nomutations +
		mutationsDiagonals.nomutations +
		mutationsInvertDiagonals.nomutations

	if (mutations === 0) {
		status = false
	}

	return {
		status,
		mutations,
		nomutations,
	}
}

const validateVertical = (array) => {
	const arrayVertical = convertToVertical(array)
	let nomutations = 0
	let mutations = 0
	arrayVertical.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			mutations++
			arrayVertical.splice(arrayVertical.indexOf(el), 1)
		}
		nomutations++
	})

	return { mutations, nomutations }
}

module.exports = { hasMutation }
