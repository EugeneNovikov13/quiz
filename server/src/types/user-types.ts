/**
 * Пользователь с клиента
 */
export interface IUser {
	/**
	 * Имя пользователя
	 */
	name: string,
	/**
	 * Фамилия пользователя
	 */
	surname: string,
	/**
	 * Электронная почта пользователя
	 */
	email: string,
	/**
	 * Пароль пользователя
	 */
	password: string,
	/**
	 * Аватарка пользователя (необязательна)
	 */
	image?: string,
}

/**
 * Пользователь из БД после преобразования
 */
export interface IMappedUser extends Omit<IUser, 'password'> {
	/**
	 * ID пользователя
	 */
	id: string
	/**
	 * Аватарка пользователя (может быть пустой строкой)
	 */
	image: string
}
