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

module.exports = { convertToMatriz, convertToVertical, joinElementsOfArray }
