const express = require('express')
const app = express()
const marioModel = require('./models/marioChar')

// Middlewares
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// your code goes here

module.exports = app
