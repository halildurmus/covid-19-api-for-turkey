const Repository = require('./timeseries.DAL')
const repo = new Repository()
const { APIError } = require('../../utils')

module.exports = {
	/**
	 * Returns the time series data as JSON.
	 * @param 	{int}	limit	The number of results to return. If it is set to 0,
	 * 											there is no restriction. Defaults to 30.
	 * @returns {Object}
	 */
	async getTimeSeries(limit = 30) {
		if (limit === 0) {
			limit = Number.POSITIVE_INFINITY
		}

		const data = await repo.getTimeSeries(limit)

		if (!data) {
			throw new APIError(500, `Couldn't get the time series data.`)
		}

		// Returns the last {limit} results.
		return JSON.parse(data).slice(-limit)
	},
}
