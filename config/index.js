require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	redisKeyLatestReport: process.env.REDIS_KEY_LATEST_REPORT,
	redisKeyTimeSeries: process.env.REDIS_KEY_TIME_SERIES,
	redisUrl: process.env.REDIS_URL,
	nodeEnv: process.env.NODE_ENV,
	serverPort: process.env.SERVER_PORT,
}
