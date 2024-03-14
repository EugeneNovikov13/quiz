/**
 * Форма ответа
 */
export interface IResponseBody<T> {
	/**
	 * Данные заданного типа (необязательное поле)
	 */
	data?: T | null,
	/**
	 * Текст ошибки (необязательное поле)
	 */
	error?: string | null
}
