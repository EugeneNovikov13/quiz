import { IQuestion, Result } from '../types';

export const generateTestResult = (
	data: IQuestion[],
	result: string[],
): Omit<Result, 'id'>[] =>
	result.map((answer, index) => ({
		question: data[index].text,
		userAnswer: answer,
		result: data[index].correctAnswer === answer,
	}));
