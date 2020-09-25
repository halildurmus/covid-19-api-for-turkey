const request = require('supertest')
const getTimeSeries = require('../../scrapers/getTimeSeries')
const { redis } = require('../../db')
const app = require('../../app')

beforeAll(async () => {
	redis.flushall()
	await getTimeSeries()
})

afterAll(() => redis.flushall())

describe('API Endpoints for time series data', () => {
	it('should list the last 30 time series data for Turkey', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/timeseries`)
			.expect(200)
		expect(res.body).toHaveLength(30)
	})

	it('should list the last 5 time series data for Turkey', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/timeseries`)
			.query({ limit: 5 })
			.expect(200)
		expect(res.body).toHaveLength(5)
	})

	it('should list the all time series data for Turkey', async () => {
		const res = await request(app)
			.get(`${process.env.API_PREFIX}/timeseries`)
			.query({ limit: 0 })
			.expect(200)
		expect(res.body.length).toBeGreaterThan(175)
		expect(res.body[0].date).toEqual('11-03-2020')
	})
})
