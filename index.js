require('dotenv').config()
const Server = require('./models/server')

const server = new Server()

const listen = server.listen()

module.exports = { server, listen }
