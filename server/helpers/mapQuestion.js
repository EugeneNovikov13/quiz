const mongoose = require('mongoose');
const mapAnswer = require('./mapAnswer');

module.exports = function (question) {
	return {
		id: question.id,
		text: question.text,
		answers: question.answers.map(answer => mongoose.isObjectIdOrHexString(answer) ? answer : mapAnswer(answer)),
	}
}
