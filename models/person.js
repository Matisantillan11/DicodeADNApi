const {Schema, model} = require('mongoose')

const personModel = Schema({
    fullname:{
        type: String,
        require: [true, "Fullname is required to create a new person"]
    },
    age:{
        type: Number, 
        require: false
    },
    dna:{
        type: [String],
        require: [true, "DNA is required to create your clinic history"]
    },
    created: {
        type: Date,
        default: Date.now(),
        require: false
    }
})

personModel.methods.toJSON = function () {
    const { __v, password, ...person } = this.toObject()
	return person
}

module.exports = model("Person", personModel)