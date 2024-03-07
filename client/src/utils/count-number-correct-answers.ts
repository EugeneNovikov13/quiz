import { IResult } from '../types';

export const countNumberCorrectAnswers = (data: IResult[], separator: string): string => {
	const rightAnswersCount = data.filter(answer => answer.result).length;

	const countQuestions = data.length;

	return `${rightAnswersCount}${separator}${countQuestions}`;
};
