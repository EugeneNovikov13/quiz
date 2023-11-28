const Question = require('../models/Question');

// add

function addQuestion(question) {
	return Question.create(question);
}

// edit

async function editQuestion(id, newQuestion) {
	const editedQuestion = await Question.findByIdAndUpdate(id, newQuestion, { returnDocument: 'after' });

	await editedQuestion.populate('answers');

	return editedQuestion;
}

// delete

function deleteQuestion(id) {
	return Question.deleteOne({ _id: id });
}

// get list

function getQuestions() {
	return Question.find().populate('answers');
}

// get item

function getQuestion(id) {
	return Question.findById(id).populate('answers');
}

module.exports = {
	addQuestion,
	editQuestion,
	deleteQuestion,
	getQuestions,
	getQuestion,
};
