import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { IUserDocument } from '../types';

const UserSchema = new Schema({
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
			validator: validator.isEmail,
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

const User = mongoose.model<IUserDocument>('User', UserSchema);

module.exports = User;
