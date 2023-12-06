const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Result = new Schema({
	question: {
		type: String,
		required: true,
	},
	userAnswer: {
		type: String,
		required: true,
	},
	result: {
		type: Boolean,
		required: true,
	}
});

const HistorySchema = mongoose.Schema({
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	results: [Result],
}, { timestamps: true });

const History = mongoose.model('History', HistorySchema);

module.exports = History;
