const Mutation = require('../models/mutation')
const validateUniqueDna = async (dna) => {
	const dnaFinded = await Mutation.findOne({ dna })

	if (dnaFinded) {
		throw new Error(`We already analize dna: ${dna}`)
	}
}

const validateBase = (dna) => {
	let repetition = 0

	let arrayTemp = convertToMatriz(dna)
	let arrayJoined = joinElementsOfArray(arrayTemp)

	validateHorizontal(arrayJoined)
	validateVertical(arrayJoined)

	//validateDiagonal(arrayTemp)
}

const convertToMatriz = (arrayOfStrings) => {
	let arrayTemp = []

	arrayOfStrings.map((string) => {
		arrayTemp.push(string.split(''))
	})

	return arrayTemp
}

const joinElementsOfArray = (array) => {
	let temporalArray = []
	array.map((elemnt) => {
		temporalArray.push(elemnt.join(''))
	})

	return temporalArray
}

const validateVertical = (array) => {
	arrayVertical = []

	while (arrayVertical.length < array.length - 1) {
		let cadena = ''

		for (let index = 0; index < array.length; index++) {
			cadena = cadena + array[index].substr(arrayVertical.length, 1)
		}

		arrayVertical.push(cadena)
	}

	console.log(arrayVertical)
}

const validateHorizontal = (array) => {
	array.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			console.log('Cumple')
		}
	})
}

const validateDiagonal = (array) => {
	const tempArray = []

	for (let j = 0; j < array.length; j++) {
		tempArray.push(array[j])
	}

	console.log(tempArray)
}

module.exports = {
	validateUniqueDna,
	validateBase,
}
