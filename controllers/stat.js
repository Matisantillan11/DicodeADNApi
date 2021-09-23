const { request, response } = require('express')
const Stat = require('../models/stat')
const getStats = async (req = request, res = response) => {
	const stats = await Stat.find({})

	if (stats) {
		return res.status(200).json({
			'status-code': 200,
			stats,
		})
	} else {
		return res.status(204).json({
			'status-code': 204,
			message: 'No se encontraron estados de ADNs actualizados',
		})
	}
}

module.exports = { getStats }
