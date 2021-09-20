const mongoose = require('mongoose')

const dbConnection = async () => {
	const { MONGO_CNN, MONGO_CNN_TEST, NODE_ENV } = process.env
	const connectionString = NODE_ENV === 'test' ? MONGO_CNN_TEST : MONGO_CNN

	try {
		await mongoose.connect(connectionString)
		console.log(`Connected successfully to the database - ${NODE_ENV}`)
	} catch (error) {
		console.error('An error was detected connecting to database: ' + error)
		throw new Error('Error connecting to the database')
	}
}

module.exports = { dbConnection }
