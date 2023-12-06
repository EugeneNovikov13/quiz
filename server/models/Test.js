const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Answer = new Schema({
	text: {
		type: String,
		required: true,
	},
});

const Question = new Schema({
	text: {
		type: String,
		required: true,
	},
	correctAnswer: {
		type: String,
		required: true,
	},
	answers: [Answer],
});

const TestSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	questions: [Question],
	history: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'History',
	}],
}, { timestamps: true });

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
