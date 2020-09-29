const { APIError } = require('../../helpers')
const service = require('./timeseries.service')

module.exports = {
	/**
	 * Returns the time series data as JSON.
	 * @param 	{int}	limit	The number of results to return. If it is set to 0,
	 * 											there is no restriction. Defaults to 30.
	 * @returns A JSON Object or an exception.
	 */
	async getTimeSeries(limit = 30) {
		if (limit === 0) {
			limit = Number.POSITIVE_INFINITY
		}

		const data = await service.getTimeSeries(limit)

		if (!data) {
			throw new APIError(500, `Couldn't get the time series data.`)
		}

		// Returns the last {limit} results.
		return JSON.parse(data).slice(-limit)
	},
}
