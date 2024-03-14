import { model } from 'mongoose';
import { Schema } from 'mongoose';
import { IAnswer, IQuestion, ITest } from '../types';

const Answer = new Schema<IAnswer>({
	text: {
		type: String,
		required: true,
	},
});

const Question = new Schema<IQuestion>({
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

const TestSchema = new Schema<ITest>({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	questions: [Question],
}, { timestamps: true });

const Test = model<ITest>('Test', TestSchema);

export default Test;
