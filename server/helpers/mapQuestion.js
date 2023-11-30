const mapAnswer = require('./mapAnswer');

module.exports = function (question) {
	return {
		id: question.id,
		text: question.text,
		correctAnswer: question.correctAnswer,
		answers: question.answers.map(mapAnswer),
	}
}
