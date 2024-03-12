import { IUser, IUserDocument } from './user-types';
import { ITest } from './test-types';
import { IResult } from './history-types';
import { Request} from 'express';

export type RequestWithParams<T> =  Request<T>;
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{}, T>

export interface ITestRequestQuery {
	user: string;
	limit: string;
	page: string;
}

export interface IUpdateUserRequestBody extends Omit<IUser, 'password'> {
	user: IUserDocument,
}

export interface IAddTestRequestBody extends Pick<ITest, 'title' | 'questions'> {
	user: IUserDocument,
}

export interface IAddHistoryRequestBody {
	results: IResult[],
	test: ITest['id']
	user: IUserDocument,
}

export type UriId = {
	id: string
}
