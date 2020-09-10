const redis = require('../../db')
const { redisKeyTimeSeries } = require('../../config')
class TimeSeriesRepository {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKey = redisKey || redisKeyTimeSeries
	}

	async getTimeSeries() {
		const data = await this.redis.get(this.redisKey)

		if (!data) {
			return
		}

		return data
	}
}

module.exports = TimeSeriesRepository
