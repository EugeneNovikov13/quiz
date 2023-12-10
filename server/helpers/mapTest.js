const mapAuthor = require('./mapAuthor');
const mapQuestion = require('./mapQuestion');

module.exports = function (test) {
	return {
		id: test.id,
		title: test.title,
		createdAt: test.createdAt.toLocaleDateString(),
		author: mapAuthor(test.author),
		questions: test.questions.map(mapQuestion),
	}
}
