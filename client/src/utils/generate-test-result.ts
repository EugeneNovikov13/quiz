import { IQuestion, IResult } from '../types';

export const generateTestResult = (
	data: IQuestion[],
	result: string[],
): Omit<IResult, 'id'>[] =>
	result.map((answer, index) => ({
		question: data[index].text,
		userAnswer: answer,
		result: data[index].correctAnswer === answer,
	}));
