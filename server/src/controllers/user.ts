import jwtFunctions from '../helpers/token';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { IUser, IUserDocument } from '../types';
import { Document } from 'mongoose';

// register

export async function register(userData: IUser) {
	if (!userData.password) {
		throw new Error('Password is empty');
	}
	const passwordHash = await bcrypt.hash(userData.password, 10);

	const userDataWithHashedPassword = {...userData, password: passwordHash}

	const user = await User.create(userDataWithHashedPassword);
	const token = jwtFunctions.generate({ id: user.id });

	return { user, token };
}

// login

export async function login(email: string, password: string) {
	const user = await User.findOne({ email });

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

export function updateUser(id: string, user: Document) {
	return User.findByIdAndUpdate(id, user, { returnDocument: 'after', runValidators: true });
}
