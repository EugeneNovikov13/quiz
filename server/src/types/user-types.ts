import { Document } from 'mongoose';

export interface IUser {
	name: string,
	surname: string,
	email: string,
	password: string,
	image?: string,
}

export interface IAuthUser extends Omit<IUser, 'password'> {
	id: string
	image: string
}

export interface IUserDocument extends Document {
	name: string,
	surname: string,
	email: string,
	password: string,
	image?: string,
}
