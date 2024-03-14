import jwtFunctions from '../helpers/token';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { IUser } from '../types';
import { HydratedDocument } from 'mongoose';

// register
/**
 * Регистрация пользователя
 * @param userData - данные нового пользователя
 */
export async function register(userData: IUser) {
	if (!userData.password) {
		throw new Error('Password is empty');
	}
	const passwordHash = await bcrypt.hash(userData.password, 10);

	const userDataWithHashedPassword = {...userData, password: passwordHash}

	const user: HydratedDocument<IUser> = await User.create(userDataWithHashedPassword);
	const token = jwtFunctions.generate({ id: user.id });

	return { user, token };
}

// login
/**
 * Авторизация пользователя
 * @param email - введённая пользователем электронная почта
 * @param password - введённый пользователем пароль
 */
export async function login(email: string, password: string) {
	const user: HydratedDocument<IUser> | null = await User.findOne({ email });

	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}

	const token = jwtFunctions.generate({ id: user.id });

	return { user, token };
}

// update
/**
 * Обновление данных пользователя
 * @param id - id пользователя
 * @param user - новые данные пользователя
 */
export function updateUser(id: string, user: Omit<IUser, 'password'>) {
	return User.findByIdAndUpdate(id, user, { returnDocument: 'after', runValidators: true });
}
