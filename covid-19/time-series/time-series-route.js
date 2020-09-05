const catchAsync = require('../../middlewares/catchAsync')
const APIError = require('../../utils/APIError')
const getTimeSeries = require('./time-series-controller')
const express = require('express')
const router = express.Router()

// GET request for listing the time series data for Turkey.
router.get(
	'/time-series',
	catchAsync(async (req, res) => {
		const { limit } = req.query
		const timeSeries = await getTimeSeries(limit)

		if (!timeSeries) {
			throw new APIError(500, `Couldn't get the time series data.`)
		}

		res.json(timeSeries)
	})
)

module.exports = router
