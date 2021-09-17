const express = require('express')
const cors = require('cors')
const person = require('../routes/person')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8080
        this.personRoute = '/api/persons'
        
        this.middlewares()
        this.routes()
    }


    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.personRoute, person)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
        })
    }

}

module.exports = Server