const express = require('express')
const cors = require('cors')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8080

        this.middlewares()
    }


    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on ${process.env.DEVURL}:${this.port}`)
        })
    }

}

module.exports = Server