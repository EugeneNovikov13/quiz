const jwt = require('jsonwebtoken');

//как бы секретная подпись
const sign = 'testSign';

module.exports = {
	//генерируем токен
	generate(data) {
		return jwt.sign(data, sign, { expiresIn: '1d' });
	},
	//проверяем токен
	verify(token) {
		return jwt.verify(token, sign);
	},
};
