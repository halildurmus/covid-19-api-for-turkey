const express = require('express')
const router = express.Router()
const { APIError } = require('../../utils')
const { catchAsync } = require('../../middlewares')
const { getTimeSeries } = require('./timeseries.controller')

// GET request for listing the time series data for Turkey.
router.get(
	'/timeseries',
	catchAsync(async (req, res) => {
		const { limit } = req.query

		if (limit < 0) {
			throw new APIError(400, `The limit parameter must be a positive number.`)
		}

		res.json(await getTimeSeries(limit))
	})
)

module.exports = router
