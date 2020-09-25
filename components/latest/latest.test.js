// Mock error handler middleware.
const { error } = require('../../middlewares')
error.handler = jest.fn((err, req, res, next) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
	})
})

const app = require('../../app')
const request = require('supertest')

it('should list the latest report data for Turkey', async () => {
	const res = await request(app)
		.get(`${process.env.API_PREFIX}/latest`)
		.expect(200)
	expect(Object.keys(res.body).length).toEqual(12)
	expect(res.body).toHaveProperty('updated')
})
