import { Schema } from 'yup';

export type FormSchema<T> = {
	[K in keyof Required<T>]: Schema<T[K]>;
};

export interface IRegistrationForm {
	name: string;
	surname: string;
	email: string;
	password: string;
	passCheck: string;
	image?: string;
}

export interface IAuthorizationForm {
	email: string;
	password: string;
}

export interface IAccountForm {
	name: string;
	surname: string;
	email: string;
	image?: string;
}
