const CronJob = require('cron').CronJob
const getCovid19Report = require('./scrapers/getCovid19Report')
const logger = require('./utils').loggers.loggerScraper

// Executes the latest report and time series scrapers.
getCovid19Report().catch((err) => logger.error(`${err}`))

// Creates a cronjob which executes the COVID-19 report scraper
// every 5 minutes between 6 and 10 pm.
const getCovid19ReportJob = new CronJob(
	'00 */5 18-22 * * *',
	getCovid19Report,
	null,
	false,
	'Europe/Istanbul'
)
getCovid19ReportJob.start()
