const { apiPrefix, swaggerJsonUrl } = require('./config')
const { error } = require('./middlewares')
const latestReportRouter = require('./components/latest/latest.route')
const timeSeriesRouter = require('./components/timeseries/timeseries.route')
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
	swaggerOptions: {
		url: swaggerJsonUrl,
	},
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions))
app.get('/', async (req, res) => {
	res.redirect('/docs')
})
app.use(apiPrefix, latestReportRouter)
app.use(apiPrefix, timeSeriesRouter)

// If the error is not an instanceOf APIError, convert it.
app.use(error.converter)
// Catch 404 and forward to error handler.
app.use(error.notFound)
// Use custom error handler, send stacktrace only during development.
app.use(error.handler)

module.exports = app
