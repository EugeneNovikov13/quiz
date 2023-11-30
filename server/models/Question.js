const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Answer = new Schema({
	text: {
		type: String,
		required: true,
	}});

const QuestionSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		unique: true,
	},
	correctAnswer: {
		type: String,
		required: true,
	},
	answers: [Answer],
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
