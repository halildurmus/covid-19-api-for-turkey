const { redis } = require('../../db')
const { redisKeyLatestReport } = require('../../config')

module.exports = {
	async getLatestReport() {
		return await redis.get(redisKeyLatestReport)
	},
}
