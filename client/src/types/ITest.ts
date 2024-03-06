import { User } from './user';

export interface ITest {
	id: string;
	title: string;
	createdAt: string;
	author: Pick<User, 'name' | 'surname'>;
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
