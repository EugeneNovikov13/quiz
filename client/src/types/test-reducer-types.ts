import { IAnswer, IQuestion, ITest } from './test-types';
import { IHistory } from './history-types';

export interface ITestState {
	editedQuestions: Set<string>;
	history: IHistory[];
	test: ITest;
}

export enum TestActionTypes {
	SET_TEST_DATA = 'SET_TEST_DATA',
	RESET_TEST_DATA = 'RESET_TEST_DATA',
	UPDATE_TEST_TITLE = 'UPDATE_TEST_TITLE',
	SET_HISTORY = 'SET_HISTORY',
	ADD_QUESTION = 'ADD_QUESTION',
	UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT',
	DELETE_QUESTION = 'DELETE_QUESTION',
	ADD_ANSWER = 'ADD_ANSWER',
	CHANGE_CORRECT_ANSWER = 'CHANGE_CORRECT_ANSWER',
	UPDATE_ANSWER_TEXT = 'UPDATE_ANSWER_TEXT',
	DELETE_ANSWER = 'DELETE_ANSWER',
}

interface ISetTestData {
	type: TestActionTypes.SET_TEST_DATA;
	payload: ITest;
}

interface IResetTestData {
	type: TestActionTypes.RESET_TEST_DATA;
}

interface IUpdateTestTitle {
	type: TestActionTypes.UPDATE_TEST_TITLE;
	payload: { title: string };
}

interface ISetHistory {
	type: TestActionTypes.SET_HISTORY;
	payload: IHistory[];
}

interface IAddQuestion {
	type: TestActionTypes.ADD_QUESTION;
	payload: IQuestion;
}

interface IUpdateQuestionText {
	type: TestActionTypes.UPDATE_QUESTION_TEXT;
	payload: Pick<IQuestion, 'id' | 'text'>;
}

interface IDeleteQuestion {
	type: TestActionTypes.DELETE_QUESTION;
	payload: Pick<IQuestion, 'id'>;
}

interface IAddAnswer {
	type: TestActionTypes.ADD_ANSWER;
	payload: {
		questionId: IQuestion['id'];
		tempAnswerId: string;
	};
}

interface IChangeCorrectAnswer {
	type: TestActionTypes.CHANGE_CORRECT_ANSWER;
	payload: { id: IQuestion['id']; text: IAnswer['text'] };
}

interface IUpdateAnswerText {
	type: TestActionTypes.UPDATE_ANSWER_TEXT;
	payload: {
		questionId: IQuestion['id'];
		answerId: IAnswer['id'];
		text: IAnswer['text'];
	};
}

interface IDeleteAnswer {
	type: TestActionTypes.DELETE_ANSWER;
	payload: { questionId: IQuestion['id']; answerId: IAnswer['id'] };
}

export type TestAction =
	| ISetTestData
	| IResetTestData
	| IUpdateTestTitle
	| ISetHistory
	| IAddQuestion
	| IUpdateQuestionText
	| IDeleteQuestion
	| IAddAnswer
	| IChangeCorrectAnswer
	| IUpdateAnswerText
	| IDeleteAnswer;
