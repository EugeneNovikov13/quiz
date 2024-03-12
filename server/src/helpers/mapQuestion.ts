import mapAnswer from './mapAnswer';
import { IQuestionDocument } from '../types';

export default function (question: IQuestionDocument) {
	return {
		id: question.id,
		text: question.text,
		correctAnswer: question.correctAnswer,
		answers: question.answers.map(mapAnswer),
	}
}
