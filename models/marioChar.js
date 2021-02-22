const mongoose = require('mongoose')

//  Your code goes here
const marioModel = new mongoose.Schema({
    // your model code
}, { collection: 'marios' })

module.exports = marioModel
