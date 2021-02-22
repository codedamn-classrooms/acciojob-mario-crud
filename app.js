const express = require('express')
const app = express()
const Mario = require('./models/marioChar')

// Middlewares
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app.get('/mario', async (req, res) => {
	const data = await Mario.find().lean()

	res.json(data)
})

app.get('/mario/:id', async (req, res) => {
	const data = await Mario.findOne({ _id: req.params.id }).lean()

	if (!data) {
		return res.status(400).json({
			message: 'Not found'
		})
	}

	res.json(data)
})

app.post('/mario', async (req, res) => {
	const mario = req.body

	console.log('mario is', mario)
	if (!mario.name || !mario.weight || typeof mario.weight !== 'number') {
		return res.status(400).json({
			message: 'incorrect data passed'
		})
	}

	const doc = {
		name: mario.name,
		weight: mario.weight
	}

	await Mario.create(doc)

	res.status(201).json(doc)
})

app.patch('/mario/:id', async (req, res) => {
	const mario = req.body
	const id = req.params.id

	if (mario.weight && typeof mario.weight !== 'number') {
		return res.status(400).json({
			message: 'incorrect data passed'
		})
	}

	try {
		const update = await Mario.updateOne({ _id: id }, { $set: mario })

		if (update.n < 1) {
			// no record updated
			return res.status(400).json({
				message: 'not found'
			})
		}

		res.status(200).json({
			message: 'updated'
		})
	} catch (error) {
		res.status(400).json({
			message: 'incorrect data'
		})
	}
})

app.delete('/mario/:id', async (req, res) => {
	const id = req.params.id

	try {
		const update = await Mario.deleteOne({ _id: id })

		if (update.n < 1) {
			// no record updated
			return res.status(400).json({
				message: 'not found'
			})
		}

		res.status(200).json({
			message: 'deleted'
		})
	} catch (error) {
		res.status(400).json({
			message: 'incorrect data'
		})
	}
})

// your code goes here

module.exports = app
