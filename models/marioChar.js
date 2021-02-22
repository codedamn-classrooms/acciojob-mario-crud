const mongoose = require('mongoose')

//  Your code goes here
const marioModel = new mongoose.Schema(
	{
		// your model code
		name: { type: String, required: true },
		weight: { type: Number, required: true }
	},
	{ collection: 'marios' }
)

module.exports = mongoose.model('MarioModel', marioModel)
