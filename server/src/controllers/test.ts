import Test from '../models/Test';
import { INewTest, IUpdatedTest } from '../types';

// add
/**
 * Создать новый тест
 * @param test - данные нового теста
 */
export async function addTest(test: INewTest) {
	const newTest = await Test.create(test);

	await newTest.populate('author');

	return newTest;
}

// edit
/**
 * Отредактировать существующий тест
 * @param id - id теста
 * @param test - новые данные теста
 */
export async function editTest(id: string, test: IUpdatedTest) {
	const newTest = await Test.findByIdAndUpdate(id, test, { returnDocument: 'after', runValidators: true });

	if (!newTest) {
		throw new Error('Не удалось обновить тест. Тест не найден.');
	}

	await newTest.populate('author');

	return newTest;
}

// delete
/**
 * Удалить тест
 * @param id - id теста
 */
export async function deleteTest(id: string) {
	await Test.deleteOne({ _id: id });
}

// get list
/**
 * Получить список тестов конкретного автора
 * @param author - id автора
 * @param limit - количество тестов на странице
 * @param page - номер страницы
 */
export async function getTests(author: string, limit: number = 8, page: number = 1) {
	const [tests, quantity] = await Promise.all([
		Test.find(author ? { author } : {})
			.populate('author')
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip((page - 1) * limit),
		Test.countDocuments(author ? { author } : {}),
	]);

	return {
		tests,
		lastPage: Math.ceil(quantity / limit),
	};
}

// get item
/**
 * Получить тест по его id
 * @param id - id теста
 */
export function getTest(id: string) {
	const test = Test.findById(id).populate('author');

	if (!test) {
		throw new Error('Не удалось загрузить тест. Тест не найден.');
	}

	return test;
}

// get question of item
/**
 * Получить вопрос теста по id теста и номеру вопроса
 * @param id - id теста
 * @param page - номер вопроса
 */
export async function getQuestion(id: string, page: number) {
	const test = await Test.findById(id, { questions: 1 });

	if (!test) {
		throw new Error('Не удалось загрузить тест. Тест не найден.');
	}

	return {
		question: test.questions[page - 1],
		lastPage: test.questions.length,
	};
}
