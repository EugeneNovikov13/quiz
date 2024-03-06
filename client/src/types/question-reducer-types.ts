import { IQuestion } from './test-types';

export interface IQuestionState {
	question: IQuestion;
	lastPage: number;
}

export enum QuestionActionTypes {
	SET_QUESTION_DATA = 'SET_QUESTION_DATA',
}

interface ISetQuestionData {
	type: QuestionActionTypes.SET_QUESTION_DATA;
	payload: { question: IQuestion; lastPage: number };
}

export type QuestionAction = ISetQuestionData;
