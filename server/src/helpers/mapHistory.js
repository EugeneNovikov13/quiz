const mapResult = require('./mapResult');

module.exports = function (history) {
	return {
		id: history.id,
		user: {
			name: history.user?.name || 'user',
			surname: history.user?.surname || 'Unknown',
		},
		results: history.results.map(mapResult),
		testDate: history.createdAt.toLocaleDateString(),
		testTime: history.createdAt.toLocaleTimeString(),
	}
}
