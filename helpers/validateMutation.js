const hasMutation = (dna) => {
	let status = true
	let nomutations = 0
	let mutations = 0

	let arrayTemp = convertToMatriz(dna)
	let arrayJoined = joinElementsOfArray(arrayTemp)

	const mutationsHorizontals = validateHorizontal(dna)
	const mutationsVerticals = validateVertical(arrayJoined)

	//const mutationsDiagonals = validateDiagonal(arrayTemp)

	mutations =
		mutations + mutationsHorizontals.mutations + mutationsVerticals.mutations

	nomutations =
		nomutations +
		mutationsHorizontals.nomutations +
		mutationsVerticals.nomutations

	return {
		mutations,
		nomutations,
	}
}

const convertToMatriz = (arrayOfStrings) => {
	let arrayTemp = []

	arrayOfStrings.map((string) => {
		arrayTemp.push(string.split(''))
	})

	return arrayTemp
}

const convertToVertical = (array) => {
	arrayVertical = []

	while (arrayVertical.length < array.length - 1) {
		let cadena = ''

		for (let index = 0; index < array.length; index++) {
			cadena = cadena + array[index].substr(arrayVertical.length, 1)
		}

		arrayVertical.push(cadena)
	}

	return arrayVertical
}

const joinElementsOfArray = (array) => {
	let temporalArray = []
	array.map((elemnt) => {
		temporalArray.push(elemnt.join(''))
	})

	return temporalArray
}

const validateHorizontal = (array) => {
	let mutations = 0
	let nomutations = 0
	array.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			mutations++
			array.splice(array.indexOf(el), 1)
		}

		nomutations++
	})

	return { mutations, nomutations }
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

const validateDiagonal = (array) => {
	let tempArray = []
	let arrayDiagonal = []

	tempArray = convertToVertical(array)

	let index = 0
	while (arrayDiagonal.length <= tempArray.length - 1) {
		let cadena = ''
		/* 		for (index; index < tempArray.length; index++) {
			cadena = cadena + tempArray[index].charAt(cadena.length)
		}

		recorrido diagonal ascendente
		*/

		//recorrido diagonal descendente

		for (index; index < tempArray.length; index++) {
			cadena = cadena + tempArray[cadena.length].charAt(index)
		}

		arrayDiagonal.push(cadena)
		index = arrayDiagonal.length
	}

	console.log(arrayDiagonal)
}

module.exports = { hasMutation }
