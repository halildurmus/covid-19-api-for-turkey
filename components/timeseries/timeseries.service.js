const { redis } = require('../../db')
const { redisKeyTimeSeries } = require('../../config')

module.exports = {
	async getTimeSeries() {
		return await redis.get(redisKeyTimeSeries)
	},
}
