import { IQuestion } from '../types';

export function findQuestionById(
	searchedId: string,
	questions: IQuestion[],
): IQuestion | undefined {
	return questions.find(ques => ques.id === searchedId);
}
