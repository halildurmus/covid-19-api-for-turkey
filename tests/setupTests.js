const getLatestReport = require('../scrapers/getLatestReport')
const getTimeSeries = require('../scrapers/getTimeSeries')
const { redis } = require('../db')

global.beforeAll(async () => {
	redis.flushall()
	await getLatestReport()
	await getTimeSeries()
})

global.afterAll(() => redis.flushall())
