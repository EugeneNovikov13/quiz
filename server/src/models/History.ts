import { model, Schema } from 'mongoose';
import { IHistory, IResult } from '../types';

const Result = new Schema<IResult>({
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

const HistorySchema = new Schema<IHistory>({
	test: {
		type: Schema.Types.ObjectId,
		ref: 'Test',
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	results: [Result],
}, { timestamps: true });

const History = model<IHistory>('History', HistorySchema);

export default History;
