const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = mongoose.Schema({
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
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url',
		},
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
