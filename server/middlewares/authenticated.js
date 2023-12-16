const { verify } = require('../helpers/token');
const User = require('../models/User');

module.exports = async function(req, res, next) {
	let user;

	try {
		const tokenData = verify(req.cookies.token);

		user = await User.findOne({ _id: tokenData.id });
	} catch (e) {
		console.log('Token not found');
		res.send({ error: 'Token not found' });

		return;
	}

	if (!user) {
		res.send({ error: 'Authenticated user not found' });

		return;
	}

	req.user = user;

	next();
};
