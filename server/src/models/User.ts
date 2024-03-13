import { IUser } from '../types';

import { Schema, model } from 'mongoose';
import validator from 'validator';

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (str: string) => {
				return validator.isEmail(str)
			},
			message: 'Email should be a valid',
		},
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: false,
	},
});

const User = model<IUser>('User', UserSchema);

export default User;
