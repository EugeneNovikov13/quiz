const Question = require('../models/Question');
const Answer = require('../models/Answer');

// add

async function addAnswer(questionId, answer) {
	const newAnswer = await Answer.create(answer);

	await Question.findByIdAndUpdate(questionId, { $push: { answers: newAnswer } });

	return newAnswer;
}

// edit

function editAnswer(id, newAnswer) {
	return Answer.findByIdAndUpdate(id, newAnswer, { returnDocument: 'after' });
}

// delete

async function deleteAnswer(questionId, answerId) {
	await Answer.deleteOne({ _id: answerId });

	await Question.findByIdAndUpdate(questionId, {$pull: {answers: answerId}})
}

module.exports = {
	addAnswer,
	editAnswer,
	deleteAnswer,
};
