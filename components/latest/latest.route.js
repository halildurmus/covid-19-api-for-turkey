const express = require('express')
const router = express.Router()
const { catchAsync } = require('../../middlewares')
const { getLatestReport } = require('./latest.controller')

// GET request for listing the latest report data for Turkey.
router.get(
	'/latest',
	catchAsync(async (req, res) => {
		res.json(await getLatestReport())
	})
)

module.exports = router
