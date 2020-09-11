/* eslint-disable camelcase */
const { formatJson, logger } = require('../utils')
const redis = require('../db')
const { redisKeyLatestReport } = require('../config')
const got = require('got')

async function getLatestReport() {
	try {
		const url = 'https://covid19.saglik.gov.tr/covid19api?getir=sondurum'
		const response = await got.get(url)

		if (!response.body.includes('tarih')) {
			logger.error(
				`Got bad response while trying to fetch the latest report data. Response: ${response.body}.`
			)
			return
		}

		const data = formatJson(JSON.parse(response.body)[0])
		const {
			agir_hasta_sayisi,
			gunluk_iyilesen,
			gunluk_test,
			gunluk_vaka,
			gunluk_vefat,
			hastalarda_zaturre_oran,
			tarih,
			toplam_iyilesen,
			toplam_test,
			toplam_vaka,
			toplam_vefat,
		} = data

		const latestReport = {
			updated: Date.now(),
			date: tarih,
			todayTests: gunluk_test,
			todayCases: gunluk_vaka,
			todayDeaths: gunluk_vefat,
			todayRecovered: gunluk_iyilesen,
			totalTests: toplam_test,
			totalCases: toplam_vaka,
			totalDeaths: toplam_vefat,
			totalRecovered: toplam_iyilesen,
			totalSeriouslyIll: agir_hasta_sayisi,
			pneumoniaRatio: hastalarda_zaturre_oran,
		}

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
	} catch (err) {
		logger.error(`Latest report scraper failed! ${err}`)
	}
}

module.exports = getLatestReport
