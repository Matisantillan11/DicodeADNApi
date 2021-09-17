const mongoose = require("mongoose")

const dbConnection = async () =>{
    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Connected successfully to the database")
        
        
    } catch (error) {
        console.error("An error was detected connecting to database: " + error)
        throw new Error("Error connecting to the database")
    
    }
}

module.exports = { dbConnection }