const { APIError } = require('../../helpers')
const Service = require('./latest.service')
const repo = new Service()

module.exports = {
	/**
	 * Returns the latest report data as JSON.
	 * @returns A JSON Object or an exception.
	 */
	async getLatestReport() {
		const data = await repo.getLatestReport()

		if (!data) {
			throw new APIError(500, `Couldn't get the latest report data.`)
		}

		return JSON.parse(data)
	},
}
