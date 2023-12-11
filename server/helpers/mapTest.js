const mapQuestion = require('./mapQuestion');
const mongoose = require('mongoose');

module.exports = function (test) {
	return {
		id: test.id,
		title: test.title,
		createdAt: test.createdAt.toLocaleDateString(),
		author: mongoose.isObjectIdOrHexString(test.author) ? undefined : {
			name: test.author.name,
			surname: test.author.surname,
		},
		questions: test.questions.map(mapQuestion),
	}
}
