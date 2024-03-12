import { IUser } from './user-types';
import { Document } from 'mongoose';

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

interface IAnswer {
	id: string;
	text: string;
}

export interface ITestList {
	lastPage: number;
	tests: ITest[];
}

export interface IQuestionDocument extends Document {
	id: string;
	text: string;
	correctAnswer: string;
	answers: IAnswer[];
}
