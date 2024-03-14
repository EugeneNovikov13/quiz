import { IUser } from './user-types';
import { HydratedDocument } from 'mongoose';

/**
 * Тест из БД
 */
export interface ITest {
	/**
	 * Заголовок теста
	 */
	title: string;
	/**
	 * Дата создания теста
	 */
	createdAt: Date;
	/**
	 * Автор теста из БД
	 */
	author: HydratedDocument<IUser>;
	/**
	 * Вопросы теста (с полями БД)
	 */
	questions: HydratedDocument<IQuestion>[];
}

/**
 * Тест после map-функции
 */
export interface IMappedTest {
	/**
	 * ID теста
	 */
	id: string;
	/**
	 * Заголовок теста
	 */
	title: string;
	/**
	 * Дата создания теста
	 */
	createdAt: string;
	/**
	 * ID автора теста
	 */
	author: Pick<IUser, 'name' | 'surname'>;
	/**
	 * Вопросы теста
	 */
	questions: IMappedQuestion[];
}

/**
 * Вопросы из БД
 */
export interface IQuestion {
	/**
	 * ID вопроса
	 */
	id: string;
	/**
	 * Текст вопроса
	 */
	text: string;
	/**
	 * Текст правильного ответа
	 */
	correctAnswer: string;
	/**
	 * Ответы (с полями БД)
	 */
	answers: HydratedDocument<IAnswer>[];
}

/**
 * Вопросы после map-функции
 */
export interface IMappedQuestion {
	/**
	 * ID вопроса
	 */
	id: string;
	/**
	 * Текст вопроса
	 */
	text: string;
	/**
	 * Текст правильного ответа
	 */
	correctAnswer: string;
	/**
	 * Ответы
	 */
	answers: IAnswer[];
}

/**
 * Ответы
 */
export interface IAnswer {
	/**
	 * ID ответа
	 */
	id: string;
	/**
	 * Текст ответа
	 */
	text: string;
}

/**
 * Список тестов вместе с последней страницей
 */
export interface ITestList {
	/**
	 * Последняя страница списка тестов, разделённых на страницы
	 */
	lastPage: number;
	/**
	 * Список тестов
	 */
	tests: IMappedTest[];
}

/**
 * Новый тест
 */
export interface INewTest {
	/**
	 * Название теста
	 */
	title: string,
	/**
	 * Вопросы теста
	 */
	questions: Omit<IMappedQuestion, 'id'>[],
	/**
	 * id автора теста
	 */
	author: string,
}

/**
 * Обновить данные теста
 */
export interface IUpdatedTest {
	/**
	 * Новое название теста
	 */
	title: string,
	/**
	 * Новый список вопросов теста
	 */
	questions: Omit<IMappedQuestion, 'id'>[],
}
