module.exports = function (result) {
	return {
		id: result.id,
		question: result.question,
		userAnswer: result.userAnswer,
		result: result.result,
	}
}
