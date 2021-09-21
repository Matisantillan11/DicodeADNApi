const { request, response } = require('express')
const Stat = require('../models/stat')
const getStats = async (req = request, res = response) => {
	const stats = await Stat.find({})

	if (stats) {
		return res.status(200).json({
			stats,
		})
	} else {
		return res.status()
	}
}

module.exports = { getStats }
