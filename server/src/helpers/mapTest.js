const mapQuestion = require('./mapQuestion');

module.exports = function (test) {
	return {
		id: test.id,
		title: test.title,
		createdAt: test.createdAt.toLocaleDateString(),
		author: {
			name: test.author?.name || 'user',
			surname: test.author?.surname || 'Unknown',
		},
		questions: test.questions.map(mapQuestion),
	}
}
