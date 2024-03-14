import { IUser } from './user-types';
import { IMappedTest } from './test-types';
import { IResult } from './history-types';
import { Request} from 'express';
import { HydratedDocument } from 'mongoose';

/**
 * Запрос с URI-параметрами
 */
export type RequestWithParams<T> =  Request<T>;
/**
 * Запрос с данными в body
 */
export type RequestWithBody<T> = Request<{},{},T>
/**
 * Запрос с query-параметрами
 */
export type RequestWithQuery<T> = Request<{},{},{}, T>
/**
 * Запрос с URI-параметрами и данными в body
 */
export type RequestWithParamsAndBody<T, K> = Request<T,{},K>

/**
 * Запрос списка тестов
 */
export interface ITestRequestQuery {
	/**
	 * ID автора теста
	 */
	user: string;
	/**
	 * количество тестов на странице
	 */
	limit: string;
	/**
	 * номер страницы
	 */
	page: string;
}

/**
 * Запрос обновления данных пользователя
 */
export interface IUpdateUserRequestBody extends Omit<IUser, 'password'> {
	/**
	 * Пользователь из БД
	 */
	user: HydratedDocument<IUser>,
}

/**
 * Запрос добавления нового теста
 */
export interface IAddTestRequestBody extends Pick<IMappedTest, 'title' | 'questions'> {
	/**
	 * Пользователь из БД
	 */
	user: HydratedDocument<IUser>,
}

/**
 * Запрос добавления результата прохождения теста
 */
export interface IAddHistoryRequestBody {
	/**
	 * Результаты теста
	 */
	results: IResult[],
	/**
	 * ID теста
	 */
	test: string
	/**
	 * Пользователь из БД
	 */
	user: HydratedDocument<IUser>,
}
