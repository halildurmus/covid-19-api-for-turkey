const CronJob = require('cron').CronJob
const getLatestReport = require('./scrapers/getLatestReport')
const { logger } = require('./utils')

// Executes the latest report and time series scrapers.
getLatestReport().catch((err) => logger.error(err))

// Creates a cronjob which executes the latest report scraper
// every 5 minutes between 6 and 10 pm.
const getLatestReportJob = new CronJob(
	'* */5 18-22 * * *',
	getLatestReport,
	null,
	false,
	'Europe/Istanbul'
)
getLatestReportJob.start()
