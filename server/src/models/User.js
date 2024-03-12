const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const validator = require('validator');

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

const User = mongoose.model('User', UserSchema);

module.exports = User;
