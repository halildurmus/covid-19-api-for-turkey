const getCovid19Report = require('../scrapers/getCovid19Report')
const { redis } = require('../db')

global.beforeAll(async () => {
	redis.flushall()
	await getCovid19Report()
})

global.afterAll(() => redis.flushall())
