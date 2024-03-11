import { Document } from 'mongoose';

export interface IUser {
	name: string,
	surname: string,
	email: string,
	password: string,
	image?: string,
}

export interface IUserId {
	id: string
}

export interface IUserDocument extends Document, IUser {}
