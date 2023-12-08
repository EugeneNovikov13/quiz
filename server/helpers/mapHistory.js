const mapResult = require('./mapResult');
const mongoose = require('mongoose');

module.exports = function (history) {
	return {
		id: history.id,
		user: mongoose.isObjectIdOrHexString(history.user) ? undefined : {
			name: history.user.name,
			surname: history.user.surname,
		},
		results: history.results.map(mapResult),
		testDate: history.createdAt.toLocaleDateString(),
		testTime: history.createdAt.toLocaleTimeString(),
	}
}
