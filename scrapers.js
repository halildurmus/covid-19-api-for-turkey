const CronJob = require('cron').CronJob
const getLatestReport = require('./scrapers/getLatestReport')
const getTimeSeries = require('./scrapers/getTimeSeries')
const { logger } = require('./utils')

// Executes the latest report and time series scrapers.
getLatestReport().catch((err) => logger.error(err))
getTimeSeries().catch((err) => logger.error(err))

// Creates a cronjob which executes the latest report scraper
// every 5 minutes between 6 and 10 pm.
const getLatestReportJob = new CronJob(
	'00 */5 18-22 * * *',
	getLatestReport,
	null,
	false,
	'Europe/Istanbul'
)
getLatestReportJob.start()

// Creates a cronjob which executes the time series scraper
// every 5 minutes between 6 and 10 pm.
const getTimeSeriesJob = new CronJob(
	'00 */5 18-22 * * *',
	getTimeSeries,
	null,
	false,
	'Europe/Istanbul'
)
getTimeSeriesJob.start()
