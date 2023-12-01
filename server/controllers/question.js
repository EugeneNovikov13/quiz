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

function getQuestions() {
	return Question.find();
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
