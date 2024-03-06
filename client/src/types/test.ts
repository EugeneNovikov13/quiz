import { User } from './user';

export interface Test {
	id: string;
	title: string;
	createdAt: string;
	author: Pick<User, 'name' | 'surname'>;
	questions: Question[];
}

export interface Question {
	id: string;
	text: string;
	correctAnswer: string;
	answers: Answer[];
}

export interface Answer {
	id: string;
	text: string;
}
