/**
 * Formats the JSON.
 * @param 	{Object}	data	JSON object
 * @returns {Object}
 */
const formatJson = (data) => {
	Object.keys(data).forEach((key) => {
		if (key === 'tarih') {
			// Replaces the dots in the string with hyphen.
			data[key] = data[key].replace(/\./g, '-')
		} else if (key === 'hastalarda_zaturre_oran') {
			// Sets the value to 0 if the value is null. Otherwise, parses the value
			// as float.
			data[key] ? (data[key] = parseFloat(data[key])) : (data[key] = 0)
		} else {
			// Sets the value to 0 if the value is null. Otherwise, removes the dots
			// in the string and parses the value as int.
			data[key]
				? (data[key] = parseInt(data[key].replace(/\./g, '')))
				: (data[key] = 0)
		}
	})

	return data
}

module.exports = formatJson
