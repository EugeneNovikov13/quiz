import mapAnswer from './mapAnswer';
import { IMappedQuestion, IQuestion } from '../types';
import { HydratedDocument } from 'mongoose';

export default function (question: HydratedDocument<IQuestion>): IMappedQuestion {
	return {
		id: question.id as string,
		text: question.text,
		correctAnswer: question.correctAnswer,
		answers: question.answers.map(mapAnswer),
	}
}
