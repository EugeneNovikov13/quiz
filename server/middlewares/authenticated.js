const { verify } = require('../helpers/token');
const User = require('../models/User');

module.exports = async function(req, res, next) {
	const token = req.cookies.token;

	if (!token) {
		console.log('Token not found');
		next();
		return;
	}

	const tokenData = verify(req.cookies.token);

	const user = await User.findOne({ _id: tokenData.id });

	if (!user) {
		return;
	}

	req.user = user;

	next();
};
