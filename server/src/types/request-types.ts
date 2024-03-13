import { IUser } from './user-types';
import { ITest } from './test-types';
import { IResult } from './history-types';
import { Request} from 'express';
import { HydratedDocument } from 'mongoose';

export type RequestWithParams<T> =  Request<T>;
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{}, T>
export type RequestWithParamsAndBody<T, K> = Request<T,{},K>

export interface ITestRequestQuery {
	user: string;
	limit: string;
	page: string;
}

export interface IUpdateUserRequestBody extends Omit<IUser, 'password'> {
	user: HydratedDocument<IUser>,
}
export interface IAddTestRequestBody extends Pick<ITest, 'title' | 'questions'> {
	user: HydratedDocument<IUser>,
}

export interface IAddHistoryRequestBody {
	results: IResult[],
	test: ITest['id']
	user: HydratedDocument<IUser>,
}
