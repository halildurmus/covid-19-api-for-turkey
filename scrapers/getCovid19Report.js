/* eslint-disable camelcase */
const cheerio = require('cheerio')
const { formatJson, loggers } = require('../utils')
const { redis } = require('../db')
const { redisKeyLatestReport, redisKeyTimeSeries } = require('../config')
const got = require('got')
const logger = loggers.loggerScraper

async function getCovid19Report() {
	try {
		const url =
			'https://covid19.saglik.gov.tr/TR-66935/genel-koronavirus-tablosu.html'
		const response = await got.get(url)
		const $ = cheerio.load(response.body)
		const scriptData = $('script')[16].children[0].data
		const formattedResponse = scriptData
			.replace('//', '')
			.replace('var geneldurumjson = ', '')
			.replace('<![CDATA[', '')
			.replace(']]>', '')
			.replace(';//', '')
			.slice(2, -1)

		if (!formattedResponse.includes('tarih')) {
			logger.error(
				`Got bad response while trying to fetch the latest data. Response: ${response.body}.`
			)

			return
		}

		const timeSeries = []
		// Reverses the array which makes the order of the array, oldest to newest.
		const data = JSON.parse(formattedResponse).reverse()
		data.forEach((e) => {
			e = formatJson(e)
			const {
				agir_hasta_sayisi,
				gunluk_iyilesen,
				gunluk_test,
				gunluk_vaka,
				gunluk_vefat,
				hastalarda_zaturre_oran,
				tarih,
				// toplam_entube,
				toplam_iyilesen,
				toplam_test,
				toplam_hasta,
				toplam_vefat,
				// toplam_yogun_bakim,
			} = e

			timeSeries.push({
				date: tarih,
				todayTests: gunluk_test,
				todayCases: gunluk_vaka,
				todayDeaths: gunluk_vefat,
				todayRecovered: gunluk_iyilesen,
				totalTests: toplam_test,
				totalCases: toplam_hasta,
				totalDeaths: toplam_vefat,
				totalRecovered: toplam_iyilesen,
				// totalPatientsInICU: toplam_yogun_bakim,
				// totalIntubated: toplam_entube,
				totalSeriouslyIll: agir_hasta_sayisi,
				pneumoniaRatio: hastalarda_zaturre_oran,
			})
		})

		const latestReport = { updated: Date.now(), ...timeSeries[data.length - 1] }
		// Saves the latest report data to redis. The data expires in 24 hours.
		redis
			.set(
				redisKeyLatestReport,
				JSON.stringify(latestReport),
				'ex',
				24 * 60 * 60
			)
			.then(() => logger.info(`Updated the latest report data.`))
			.catch((err) => logger.error(`${err}`))

		// Saves the time series data to redis. The data expires in 24 hours.
		redis
			.set(redisKeyTimeSeries, JSON.stringify(timeSeries), 'ex', 24 * 60 * 60)
			.then(() => logger.info(`Updated the time series data.`))
			.catch((err) => logger.error(`${err}`))
	} catch (err) {
		logger.error(`COVID-19 scraper failed! ${err}`)
	}
}

module.exports = getCovid19Report
