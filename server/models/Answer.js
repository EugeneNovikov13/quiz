const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		unique: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
