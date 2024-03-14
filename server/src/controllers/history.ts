import History from '../models/History';
import { INewHistory } from '../types';

//add
/**
 * Добавить новую историю
 * @param history - данные истории
 */
export async function addHistory(history: INewHistory) {
	const newHistory = await History.create(history);

	await newHistory.populate('user', { name: 1, surname: 1 });

	return newHistory;
}

//delete along with test
/**
 * Удалить все истории теста (удаляются вместе с тестом)
 * @param id - id теста
 */
export async function deleteHistory(id: string) {
	await History.deleteMany({ test: id });
}

// get list by test id
/**
 * Получить истории прохождения теста
 * @param id - id теста
 */
export function getHistories(id: string) {
	return History.find({ test: id })
		.sort({ createdAt: -1 })
		.populate('user', { name: 1, surname: 1 });
}
