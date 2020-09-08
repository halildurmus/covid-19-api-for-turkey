const { redisKeyLatestReport } = require('../../config')
const { redis } = require('../../utils')

// Returns the latest report data as JSON.
const getLatestReport = async () => {
	const data = await redis.get(redisKeyLatestReport)

	if (!data) {
		return
	}

	return JSON.parse(data)
}

module.exports = getLatestReport
