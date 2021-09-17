const express = require('express')
const cors = require('cors')
const person = require('../routes/person')
const mutation = require('../routes/mutation')
const {dbConnection} = require('../database/configuration')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8080
        this.personRoute = '/api/persons'
        this.mutationRoute = '/api/mutation'
        
        this.ConnectToDb()

        this.middlewares()

        this.routes()
        
    }


    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.personRoute, person)
        this.app.use(this.mutationRoute, mutation)
    }

    async ConnectToDb(){
        await dbConnection()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
        })
    }

}

module.exports = Server