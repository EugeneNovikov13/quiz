import { IUser } from './user-types';
import { HydratedDocument } from 'mongoose';
import { ITest } from './test-types';

/**
 * История из БД
 */
export interface IHistory {
	/**
	 * Тест из БД
	 */
	test: HydratedDocument<ITest>,
	/**
	 * Пользователь из БД
	 */
	user: HydratedDocument<IUser>,
	/**
	 * Список результатов
	 */
	results: [IResult],
	/**
	 * Дата создания истории
	 */
	createdAt: Date;
}

/**
 * История после map-функции
 */
export interface IMappedHistory {
	/**
	 * id истории в БД
	 */
	id: string;
	/**
	 * Данные пользователя, создавшего историю
	 */
	user: {
		/**
		 * Имя пользователя, создавшего историю
		 */
		name: IUser['name'];
		/**
		 * Фамилия пользователя, создавшего историю
		 */
		surname: IUser['surname'];
	};
	/**
	 * Список результатов прохождения теста
	 */
	results: IResult[];
	/**
	 * Дата прохождения теста
	 */
	testDate: string;
	/**
	 * Время прохождения теста
	 */
	testTime: string;
}

/**
 * Результат ответа на вопрос
 */
export interface IResult {
	/**
	 * id результата из БД
	 */
	id: string;
	/**
	 * Заданный вопрос
	 */
	question: string;
	/**
	 * Полученный ответ от пользователя
	 */
	userAnswer: string;
	/**
	 * Результат
	 */
	result: boolean;
}

/**
 * Новая история
 */
export interface INewHistory {
	/**
	 * id пользователя, создавшего историю
	 */
	user: string,
	/**
	 * id пройденного теста
	 */
	test: string,
	/**
	 * Список результатов
	 */
	results: IResult[],
}
