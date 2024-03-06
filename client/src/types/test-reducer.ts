import { Answer, Question, Test } from './test';
import { History } from './history';

export interface ITestState {
	editedQuestions: Set<string>;
	history: History[];
	test: Test;
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
	payload: Test;
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
	payload: History[];
}

interface IAddQuestion {
	type: TestActionTypes.ADD_QUESTION;
	payload: Question;
}

interface IUpdateQuestionText {
	type: TestActionTypes.UPDATE_QUESTION_TEXT;
	payload: Pick<Question, 'id' | 'text'>;
}

interface IDeleteQuestion {
	type: TestActionTypes.DELETE_QUESTION;
	payload: Pick<Question, 'id'>;
}

interface IAddAnswer {
	type: TestActionTypes.ADD_ANSWER;
	payload: {
		questionId: Question['id'];
		tempAnswerId: string;
	};
}

interface IChangeCorrectAnswer {
	type: TestActionTypes.CHANGE_CORRECT_ANSWER;
	payload: { id: Question['id']; text: Answer['text'] };
}

interface IUpdateAnswerText {
	type: TestActionTypes.UPDATE_ANSWER_TEXT;
	payload: { questionId: Question['id']; answerId: Answer['id']; text: Answer['text'] };
}

interface IDeleteAnswer {
	type: TestActionTypes.DELETE_ANSWER;
	payload: { questionId: Question['id']; answerId: Answer['id'] };
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
