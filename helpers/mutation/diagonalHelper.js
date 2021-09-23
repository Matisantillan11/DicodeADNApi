const { convertToVertical } = require('./convertHelpers')

const validateDiagonal = (array) => {
	let mutations = 0
	let nomutations = 0

	const LowerDiagonal = LowerDiagonalTravel(array)

	LowerDiagonal.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			mutations++
			LowerDiagonal.splice(LowerDiagonal.indexOf(el), 1)
		}

		nomutations++
	})

	return { mutations, nomutations }
}

const validateInvertDiagonal = (array) => {
	let mutations = 0
	let nomutations = 0

	const invertDiagonal = invertDiagonalTravel(array)

	invertDiagonal.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			mutations++
			invertDiagonal.splice(invertDiagonal.indexOf(el), 1)
		}

		nomutations++
	})

	return { mutations, nomutations }
}

const invertDiagonalTravel = (array) => {
	let tempArray = [...array]
	let arrayDiagonal = []

	let index = tempArray.length - 1
	while (arrayDiagonal.length < tempArray.length) {
		let cadena = ''

		for (index; index >= 0; index--) {
			cadena = cadena + tempArray[index].charAt(cadena.length)
		}

		arrayDiagonal.push(cadena)
		index = tempArray.length - arrayDiagonal.length - 1
	}

	return arrayDiagonal
}

const LowerDiagonalTravel = (array) => {
	let tempArray = convertToVertical(array)
	let arrayDiagonal = []
	let index = 0

	while (arrayDiagonal.length <= tempArray.length - 1) {
		let cadena = ''
		//recorrido diagonal descendente

		for (index; index <= tempArray.length - 1; index++) {
			cadena = cadena + tempArray[cadena.length].charAt(index)
		}

		arrayDiagonal.push(cadena)
		index = arrayDiagonal.length
	}

	return arrayDiagonal
}

module.exports = {
	validateInvertDiagonal,
	validateDiagonal,
}
