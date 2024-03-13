import { IUser } from './user-types';
import { HydratedDocument } from 'mongoose';

export interface ITest {
	id: string;
	title: string;
	createdAt: string;
	author: Pick<IUser, 'name' | 'surname'>;
	questions: HydratedDocument<IQuestion>[];
}

export interface IMappedTest {
	id: string;
	title: string;
	createdAt: string;
	author: Pick<IUser, 'name' | 'surname'>;
	questions: IMappedQuestion[];
}

export interface IQuestion {
	id: string;
	text: string;
	correctAnswer: string;
	answers: HydratedDocument<IAnswer>[];
}

export interface IMappedQuestion {
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
