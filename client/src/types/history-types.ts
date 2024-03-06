import { User } from './user-types';

export interface History {
	id: string;
	user: {
		name: User['name'];
		surname: User['surname'];
	};
	results: Result[];
	testDate: string;
	testTime: string;
}

export interface Result {
	id: string;
	question: string;
	userAnswer: string;
	result: boolean;
}
