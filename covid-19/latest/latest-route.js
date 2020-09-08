const { catchAsync } = require('../../middlewares')
const { APIError } = require('../../utils')
const getLatestReport = require('./latest-controller')
const express = require('express')
const router = express.Router()

// GET request for listing the latest report data for Turkey.
router.get(
	'/latest',
	catchAsync(async (req, res) => {
		const latestReport = await getLatestReport()

		if (!latestReport) {
			throw new APIError(500, `Couldn't get the latest report data.`)
		}

		res.json(latestReport)
	})
)

module.exports = router
