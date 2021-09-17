const {Schema, model} = require('mongoose')

const mutationSchema = Schema({
    dna: {
        type: [String],
        require: [ true , "DNA must be provided"]
    },
    hasMutation: {
        type: Boolean,
        require: false,
        default: false
    }, 
    dateRegistMutation: {
        type: Date,
        require: false, 
        default: Date.now()
    }
})

module.exports = 'Mutation', mutationSchema