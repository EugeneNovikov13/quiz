import { IUser } from './user-types';

export interface IHistory {
	id: string;
	user: {
		name: IUser['name'];
		surname: IUser['surname'];
	};
	results: IResult[];
	testDate: string;
	testTime: string;
}

export interface IResult {
	id: string;
	question: string;
	userAnswer: string;
	result: boolean;
}
