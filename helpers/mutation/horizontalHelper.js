const validateHorizontal = (array) => {
	let arrayTemp = [...array]
	let mutations = 0
	let nomutations = 0
	arrayTemp.map((el) => {
		if (
			el.match('CCCC') ||
			el.match('AAAA') ||
			el.match('TTTT') ||
			el.match('GGGG')
		) {
			mutations++
			arrayTemp.splice(arrayTemp.indexOf(el), 1)
		}

		nomutations++
	})

	return { mutations, nomutations }
}

module.exports = { validateHorizontal }
