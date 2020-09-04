/* eslint-disable camelcase */
const { redisKeyTimeSeries } = require('../config')
const { formatJson, logger, redis } = require('../utils')
const got = require('got')

const getTimeSeries = async () => {
	try {
		const url = 'https://covid19.saglik.gov.tr/covid19api?getir=liste'
		const response = await got.get(url)

		if (!response.body.includes('tarih')) {
			logger.error(
				`Got bad response while fetching the time series data. Response: ${response.body}.`
			)
			return
		}

		const timeSeries = []
		// Reverses the array which makes the order of the array, oldest to newest.
		const data = JSON.parse(response.body).reverse()
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
				toplam_entube,
				toplam_iyilesen,
				toplam_test,
				toplam_vaka,
				toplam_vefat,
				toplam_yogun_bakim,
			} = e

			timeSeries.push({
				date: tarih,
				todayTests: gunluk_test,
				todayCases: gunluk_vaka,
				todayDeaths: gunluk_vefat,
				todayRecovered: gunluk_iyilesen,
				totalTests: toplam_test,
				totalCases: toplam_vaka,
				totalDeaths: toplam_vefat,
				totalRecovered: toplam_iyilesen,
				totalPatientsInICU: toplam_yogun_bakim,
				totalIntubated: toplam_entube,
				totalSeriouslyIll: agir_hasta_sayisi,
				pneumoniaRatio: hastalarda_zaturre_oran,
			})
		})

		// Saves the time series data to redis. The data expires in 24 hours.
		redis
			.set(redisKeyTimeSeries, JSON.stringify(timeSeries), 'ex', 24 * 60 * 60)
			.catch((err) => logger.error(err))

		logger.info(`Updated the time series data.`)
	} catch (err) {
		logger.error('Time series scraper failed!', err)
	}
}

module.exports = getTimeSeries
