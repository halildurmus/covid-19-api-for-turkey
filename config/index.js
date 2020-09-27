require('lazy-universal-dotenv').getEnvironment()

module.exports = {
	apiPrefix: process.env.API_PREFIX,
	nodeEnv: process.env.NODE_ENV,
	redisKeyLatestReport: process.env.REDIS_KEY_LATEST_REPORT,
	redisKeyTimeSeries: process.env.REDIS_KEY_TIME_SERIES,
	redisUri: process.env.REDIS_URL,
	swaggerJsonUrl: process.env.SWAGGER_JSON_URL,
}
