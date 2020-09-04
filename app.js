const { apiPrefix } = require('./config')
const { error } = require('./middlewares')
const latestReportRouter = require('./covid-19/latest-report/latest-report-route')
const timeSeriesRouter = require('./covid-19/time-series/time-series-route')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(apiPrefix, latestReportRouter)
app.use(apiPrefix, timeSeriesRouter)

// If the error is not an instanceOf APIError, convert it.
app.use(error.converter)
// Catch 404 and forward to error handler.
app.use(error.notFound)
// Use custom error handler, send stacktrace only during development.
app.use(error.handler)

module.exports = app
