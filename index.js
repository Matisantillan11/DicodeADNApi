const Server = require('./models/server')

require('dotenv').config()

const server = new Server()

const listen = server.listen()

module.exports = { server, listen }
