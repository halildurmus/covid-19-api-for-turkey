require('dotenv').config()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
	redisPassword: process.env.REDIS_PASSWORD,
	redisKeyLatestReport: process.env.REDIS_KEY_LATEST_REPORT,
	redisKeyTimeSeries: process.env.REDIS_KEY_TIME_SERIES,
	nodeEnv: process.env.NODE_ENV,
	serverPort: process.env.SERVER_PORT,
}
