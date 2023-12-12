const mapResult = require('./mapResult');

module.exports = function (history) {
	return {
		id: history.id,
		user: {
			name: history.user.name,
			surname: history.user.surname,
		},
		results: history.results.map(mapResult),
		testDate: history.createdAt.toLocaleDateString(),
		testTime: history.createdAt.toLocaleTimeString(),
	}
}
