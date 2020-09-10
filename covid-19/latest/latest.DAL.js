const redis = require('../../db')
const { redisKeyLatestReport } = require('../../config')
class LatestRepository {
	constructor(redisDb, redisKey) {
		this.redis = redisDb || redis
		this.redisKey = redisKey || redisKeyLatestReport
	}

	async getLatestReport() {
		const data = await this.redis.get(this.redisKey)

		if (!data) {
			return
		}

		return JSON.parse(data)
	}
}

module.exports = LatestRepository
