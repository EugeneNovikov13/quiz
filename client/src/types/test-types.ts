import { IUser } from './user-types';

export interface ITest {
	id: string;
	title: string;
	createdAt: string;
	author: Pick<IUser, 'name' | 'surname'>;
	questions: IQuestion[];
}

export interface IQuestion {
	id: string;
	text: string;
	correctAnswer: string;
	answers: IAnswer[];
}

export interface IAnswer {
	id: string;
	text: string;
}

export interface ITestList {
	lastPage: number;
	tests: ITest[];
}
