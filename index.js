const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PUBLIC_PORT
mongoose.connect('mongodb://localhost/mariodb', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

mongoose.connection
	.once('open', () => {
		console.log('connection established')
	})
	.on('connectionError', (err) => {
		console.log('error', err)
	})

app.listen(port, () => console.log(`App listening on port ${port}!`))
