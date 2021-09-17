const {Schema, model} = require('mongoose')

const statSchema = Schema({
    dna: {
        type: [String],
        require: [ true , "DNA must be provided"],
        unique: true
    },
    hasMutation: {
        type: Boolean,
        require: false,
        default: false
    }, 
    countMutations: {
        type: Number,
        require: [ true, "The count of mutations must be provided"],
        default: 0
    },
    countNoMutations: {
        type: Number,
        require: [ true, "The count of no mutations must be provided"], 
        default: 0
    },
    ratio: {
        type: Number,
        require: false, 
        default: 0
    }
})

module.exports = model('Stat', statSchema)