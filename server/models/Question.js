const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
	text: {
		type: String,
		required: true,
		unique: true,
	},
	answers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Answer',
	}],
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
