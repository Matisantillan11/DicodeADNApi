const express = require('express')
const cors = require('cors')

const mutation = require('../routes/mutation')
const stat = require('../routes/stat')

const { dbConnection } = require('../database/configuration')

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT || 8080
		this.mutationRoute = '/api/mutation'
		this.statRoute = '/api/stats'

		this.ConnectToDb()

		this.middlewares()

		this.routes()
	}

	middlewares() {
		this.app.use(express.json())
		this.app.use(cors())
		this.app.use(express.static('public'))
	}

	routes() {
		this.app.use(this.mutationRoute, mutation)
		this.app.use(this.statRoute, stat)

		this.app.use('*', (req, res) => {
			res.status(204).json({
				status_code: 204,
				message: 'No content founded in this endpoint',
				endopoint_with_response: [
					{
						endpoint: this.mutationRoute,
					},
					{
						endpoint: this.statRoute,
					},
				],
			})
		})
	}

	async ConnectToDb() {
		await dbConnection()
	}

	listen() {
		return this.app.listen(this.port, () => {
			console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
		})
	}
}

module.exports = Server
