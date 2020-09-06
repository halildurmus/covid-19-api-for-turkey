require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	redisKeyLatestReport: process.env.REDIS_KEY_LATEST_REPORT,
	redisKeyTimeSeries: process.env.REDIS_KEY_TIME_SERIES,
	redisUrl: process.env.REDIS_URL,
}
