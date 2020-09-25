const request = require('supertest')
const getLatestReport = require('../../scrapers/getLatestReport')
const { redis } = require('../../db')
const app = require('../../app')

beforeAll(async () => {
	redis.flushall()
	await getLatestReport()
})

afterAll(() => redis.flushall())

it('should list the latest report data for Turkey', async () => {
	const res = await request(app)
		.get(`${process.env.API_PREFIX}/latest`)
		.expect(200)
	expect(Object.keys(res.body).length).toEqual(12)
	expect(res.body).toHaveProperty('updated')
})
