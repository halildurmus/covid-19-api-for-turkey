const { redisKeyTimeSeries } = require('../../config')
const { redis } = require('../../utils')

/**
 * Returns the time series data as JSON.
 * @param 	{int} 		limit		Number of results to return. If it is set to 0,
 * 														there is no restriction. Defaults to 30.
 * @returns {Object}
 */
const getTimeSeries = async (limit = 30) => {
	if (limit === 0) {
		limit = Number.POSITIVE_INFINITY
	}

	// Fetches the time series data from redis.
	const data = await redis.get(redisKeyTimeSeries)

	if (!data) {
		return
	}

	// Returns the last {limit} results.
	return JSON.parse(data).slice(-limit)
}

module.exports = getTimeSeries
