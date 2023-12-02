const Question = require('../models/Question');

// add

function addQuestion(question) {
	return Question.create(question);
}

// edit

function editQuestion(id, newQuestion) {
	return Question.findByIdAndUpdate(id, newQuestion, { returnDocument: 'after' });
}

// delete

function deleteQuestion(id) {
	return Question.deleteOne({ _id: id });
}

// get list

async function getQuestions(limit = 0, page = 1) {
	const [questions, quantity] = await Promise.all([
		Question.find()
			.limit(limit)
			.skip((page - 1) * limit),
		Question.countDocuments(),
	]);

	return {
		questions,
		lastQuestionNumber: quantity,
	};
}

// get item

function getQuestion(id) {
	return Question.findById(id);
}

module.exports = {
	addQuestion,
	editQuestion,
	deleteQuestion,
	getQuestions,
	getQuestion,
};
